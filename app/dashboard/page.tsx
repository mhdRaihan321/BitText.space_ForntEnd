"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardIndex() {
    const router = useRouter();

    useEffect(() => {
        router.push("/dashboard/overview");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-gray-500 animate-pulse">Redirecting to overview...</div>
        </div>
    );
}
