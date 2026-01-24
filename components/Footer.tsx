"use client";

import Link from "next/link";
import { Github, Twitter, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 group w-fit">
                            <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-all p-1">
                                <img
                                    src="/onlyLogo.png"
                                    alt="BitText Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">BitText</span>
                        </Link>
                        <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
                            Empowering developers to build their own SMS infrastructure.
                            Completely open-source, private, and carrier-agnostic.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/mhdraihan321"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://x.com/LinksinB75178"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:mhdraihan383@gmail.com"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link href="/features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                            <li><Link href="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                            <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Developer Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Developer</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li>
                                <a
                                    href="https://github.com/mhdraihan321/BitText"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors flex items-center gap-1"
                                >
                                    GitHub Repo <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li><Link href="/docs#api-reference" className="hover:text-blue-400 transition-colors">API Reference</Link></li>
                            <li><Link href="/docs#webhooks" className="hover:text-blue-400 transition-colors">Webhooks</Link></li>
                            <li><Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} BitText. Built for efficiency.
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        Made with <span className="text-red-500">❤</span> by
                        <a
                            href="https://github.com/mhdraihan321"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-medium hover:text-blue-400 transition-colors decoration-blue-500/30 underline underline-offset-4"
                        >
                            Raihan
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
