"use client";

import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useRequireAuth } from "../hooks/useRequireAuth";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

function LoginForm() {
    const { user, isAuthenticated, setUser } = useRequireAuth<User>(false); // Use the hook and get setUser
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/dashboard";

    useEffect(() => {
        if (isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, router, redirectTo]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            router.push(redirectTo);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to manage your SMS gateway</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Email or Username</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                            Sign In <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-gray-500 text-sm">OR</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <a
                        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
                        onClick={() => {
                            if (redirectTo !== "/dashboard") {
                                sessionStorage.setItem("redirectAfterLogin", redirectTo);
                            }
                        }}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 hover:bg-gray-100"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        Continue with Google
                    </a>

                    <p className="mt-8 text-center text-gray-500 text-sm">
                        Don't have an account? <Link href="/register" className="text-blue-400 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><ArrowRight className="w-10 h-10 text-blue-500 animate-spin" /></div>}>
            <LoginForm />
        </Suspense>
    );
}
