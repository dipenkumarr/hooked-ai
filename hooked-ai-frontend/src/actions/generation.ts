"use server";

import { revalidatePath } from "next/cache";
import { inngest } from "~/inngest/client";
import { db } from "~/server/db";

export async function processVideo(uploadedFileId: string) {
    const uploadedVideo = await db.uploadedFile.findUniqueOrThrow({
        where: { id: uploadedFileId },
        select: {
            id: true,
            userId: true,
            uploaded: true,
        }
    })

    if (uploadedVideo.uploaded) {
        return; // Already processed
    }

    await inngest.send({
        name: "process-video-events",
        data: {
            uploadedFileId: uploadedVideo.id,
            userId: uploadedVideo.userId,
        }
    })

    await db.uploadedFile.update({
        where: { id: uploadedFileId },
        data: {
            uploaded: true,
        }
    })

    revalidatePath("/dashboard");
}