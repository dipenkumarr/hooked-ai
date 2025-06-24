import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center p-12 gap-5">
            <Loader2 className="text-muted-foreground h-12 w-12 animate-spin"></Loader2>
            <span className="ml-2 text-lg">Loading dashboard...</span>
        </div>
    );
}