"use client";

import type { Clip } from '@prisma/client';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Dropzone, { type DropzoneState } from 'shadcn-dropzone';
import { UploadCloud } from 'lucide-react';

export default function DashboardClient({ uploadedFiles, clips }: {
    uploadedFiles: {
        id: string;
        s3Key: string;
        displayName: string | null;
        status: string;
        createdAt: Date;
        clipsCount: number;
    }[], clips: Clip[]
}) {

    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleDrop = (acceptedFiles: File[]) => { }

    return (
        <div className='mx-auto flex max-w-5xl flex-col space-y-6 px-4 py-8'>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className='text-2xl font-semibold tracking-tight'>hooked ai</h1>
                    <p className='text-muted-foreground text-sm'>
                        Upload your content and get AI-generate clips.
                    </p>
                </div>
                <Link href="/dashboard/billing">
                    <Button>
                        But Credits
                    </Button>
                </Link>
            </div>

            <Tabs defaultValue="upload">
                <TabsList>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="my-clips">My Clips</TabsTrigger>
                </TabsList>

                <TabsContent value="upload">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Content</CardTitle>
                            <CardDescription>Upload your audio or video file to generate clips</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Dropzone
                                onDrop={handleDrop}
                                accept={{ 'video/mp4': ['.mp4'] }}
                                maxSize={500 * 1024 * 1024}
                                disabled={uploading}
                            >
                                {(dropzone: DropzoneState) => (
                                    <>
                                        <div className='flex flex-col items-center justify-center space-y-4 rounded-lg p-10 text-center'>
                                            <UploadCloud className='text-muted-foreground h-12 w-12' />
                                            <p className="font-medium">Drag and drop you file</p>
                                            <p className=" text-muted-foreground text-sm font-medium">or click to browse (MP4 up to 500MB)</p>
                                            <Button variant="default" size="sm" className='cursor-pointer' disabled={uploading}>Select File</Button>
                                        </div>
                                    </>
                                )}
                            </Dropzone>
                            <div className="flex items-start justify-between">
                                <div>
                                    {files.length > 0 && (
                                        <div className="text-sm space-y-2 text-muted-foreground">
                                            <p className='font-medium'>Selected file:</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="my-clips"></TabsContent>
            </Tabs>
        </div>
    )
}
