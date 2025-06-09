from email.mime import audio
import json
import os
import pathlib
import re
import subprocess
import time
import uuid
import boto3
import modal
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
from torch import device
import whisperx


class ProcessVideoRequest(BaseModel):
    s3_key: str


image = (
    modal.Image.from_registry("nvidia/cuda:12.4.0-devel-ubuntu22.04", add_python="3.12")
    .apt_install(["ffmpeg", "libgl1-mesa-glx", "wget", "libcudnn8", "libcudnn8-dev"])
    .pip_install_from_requirements("requirements.txt")
    .run_commands(
        [
            "mkdir -p /usr/share/fonts/truetype/custom",
            "wget -O /usr/share/fonts/truetype/custom/Anton-Regular.ttf https://github.com/google/fonts/raw/main/ofl/anton/Anton-Regular.ttf",
            "fc-cache -f -v",
        ]
    )
    .add_local_dir("asd", "/asd", copy=True)
)

app = modal.App("hooked-ai", image=image)
volume = modal.Volume.from_name("hooked-ai-model-cache", create_if_missing=True)
mount_path = "/root/.cache/torch"

auth_scheme = HTTPBearer()


@app.cls(
    gpu="L40S",
    timeout=900,
    retries=0,
    scaledown_window=20,
    secrets=[modal.Secret.from_name("hooked-ai-secret")],
    volumes={mount_path: volume},
)
class HookedAI:
    @modal.enter()
    def load_model(self):
        print("Loading models")
        self.whisperx_model = whisperx.load_model(
            "large-v2", device="cuda", compute_type="float16"
        )
        self.alignment_model, self.metadata = whisperx.load_align_model(
            language_code="en", device="cuda"
        )
        print("Transcription Models loaded successfully")

    def transcribe_video(self, base_dir: str, video_path: str):
        audio_path = base_dir + "/" + "audio.wav"
        extract_command = (
            f"ffmpeg -i {video_path} -vn -acodec pcm_s16le -ar 16000 -ac 1 {audio_path}"
        )
        subprocess.run(extract_command, shell=True, check=True, capture_output=True)

        print("Starting transcription with WhisperX")
        start_time = time.time()
        audio = whisperx.load_audio(str(audio_path))
        result = self.whisperx_model.transcribe(audio, batch_size=16)
        result = whisperx.align(
            result["segments"],
            self.alignment_model,
            self.metadata,
            audio,
            device="cuda",
            return_char_alignments=False,
        )

        duration = time.time() - start_time
        print(f"Transcription and Alignment took {duration:.2f} seconds")

        print(json.dumps(result, indent=2))

    @modal.fastapi_endpoint(method="POST")
    def process_video(
        self,
        request: ProcessVideoRequest,
        token: HTTPAuthorizationCredentials = Depends(auth_scheme),
    ):
        s3_key = request.s3_key
        if token.credentials != os.environ["AUTH_TOKEN"]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid bearer token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        run_id = str(uuid.uuid4())
        base_dir = pathlib.Path("/tmp") / run_id
        base_dir.mkdir(parents=True, exist_ok=True)

        # Download file
        video_path = base_dir / "input.mp4"
        s3_client = boto3.client("s3")
        s3_client.download_file("hooked-ai", s3_key, str(video_path))

        print(os.listdir(base_dir))

        self.transcribe_video(str(base_dir), str(video_path))


@app.local_entrypoint()
def main():
    import requests

    hooked_ai = HookedAI()
    url = hooked_ai.process_video.web_url
    if url is None:
        raise ValueError("The process_video.web_url is None. Cannot make POST request.")
    payload = {"s3_key": "test1/mi65min.mp4"}
    headers = {"Content-Type": "application/json", "Authorization": "Bearer 123123"}
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    result = response.json()
    print(result)
