"use client";

import type { Clip } from "@prisma/client";
import { Download, Loader2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getClipPlayUrl } from "~/actions/generation";
import { Button } from "./ui/button";

function ClipCard({ clip }: { clip: Clip }) {

    const [playUrl, setPlayUrl] = useState<string | null>(null);
    const [isLoadingUrl, setIsLoadingUrl] = useState(true);

    useEffect(() => {
        async function fetchPlayUrl() {
            // setIsLoadingUrl(true);
            try {
                const response = await getClipPlayUrl(clip.id);
                if (response.success && response.url) {
                    setPlayUrl(response.url);
                } else if (response.error) {
                    console.error("Error fetching clip play URL:", response.error)
                }

            } catch (error) {
                console.error("Error fetching clip play URL:", error);
            } finally {
                setIsLoadingUrl(false);
            }
        }

        void fetchPlayUrl()
    }, [clip.id]);

    const handleDownload = () => {
        if (playUrl) {
            window.open(playUrl, '_blank');
        }
    };

    return (
        <div className="flex max-w-52 flex-col gap-2">
            <div className="bg-muted">
                {isLoadingUrl ? (
                    <div className="flex h-full w-full items-center justify-center">
                        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
                    </div>
                ) : playUrl ? (
                    <video
                        src={playUrl}
                        controls
                        preload="metadata"
                        className="h-full w-full rounded-md object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Play className="text-muted-foreground h-10 w-10 opacity-50" />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="mr-1.5 h-4 w-4" />
                    Download
                </Button>
            </div>
        </div>
    );

}

export function ClipDisplay({ clips }: { clips: Clip[] }) {

    if (clips.length === 0) {
        return (
            <p className="text-muted-foreground text-center p-4">
                No clips available yet 😔
            </p>
        );
    }

    return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {clips.map((clip) => (
            <ClipCard key={clip.id} clip={clip} />
        ))}
    </div>

}