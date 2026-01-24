"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useRequireAuth<T = any>(redirectIfUnauthenticated = true) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) {
            if (redirectIfUnauthenticated) {
                router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
            }
            setLoading(false);
            return;
        }

        try {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Failed to parse user data", error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            router.push("/login");
        } finally {
            setLoading(false);
        }
    }, [router]);

    return { user, loading, isAuthenticated, setUser };
}
