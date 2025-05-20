from pytubefix import YouTube
from pytubefix.cli import on_progress

url1 = "https://youtu.be/SOG0GmKts_I?si=9001mNv5F-9YbqpL"
url2 = "https://youtu.be/4bQikdI0XGs?si=nFhCBTobdPC5LLsq"

yt = YouTube(url2, on_progress_callback=on_progress)
print("Title:", yt.title)

ys = yt.streams.get_highest_resolution()
ys.download()
