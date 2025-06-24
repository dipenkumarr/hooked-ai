"use server"

import { redirect } from "next/navigation";
import { id } from "zod/v4/locales";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import Loading from "./loading";
import DashboardClient from "~/components/dashboard-client";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/login");
    }

    const userData = await db.user.findUniqueOrThrow({
        where: {
            id: session.user.id,
        },
        select: {
            uploadedFiles: {
                where: {
                    uploaded: true,
                },
                select: {
                    id: true,
                    s3Key: true,
                    displayName: true,
                    status: true,
                    createdAt: true,
                    _count: {
                        select: {
                            clips: true,
                        },
                    }
                }
            },
            clips: {
                orderBy: {
                    createdAt: "desc",
                }
            }
        }
    })

    const formattedFiles = userData.uploadedFiles.map((files) => ({
        id: files.id,
        s3Key: files.s3Key,
        displayName: files.displayName,
        status: files.status,
        createdAt: files.createdAt,
        clipsCount: files._count.clips,
    }))


    return (
        <h1>
            <DashboardClient uploadedFiles={formattedFiles} clips={userData.clips} />
        </h1>
    )
}