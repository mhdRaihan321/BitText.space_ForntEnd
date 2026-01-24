"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Smartphone, Globe, Code, Zap, Shield, BarChart3, Cloud, Layers, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Features() {
    const features = [
        {
            icon: <Smartphone className="w-10 h-10 text-blue-400" />,
            title: "Android Gateway",
            description: "Convert any Android phone into a high-performance SMS gateway. Supports background execution and automatic service restarts.",
            points: ["API Level 21+ Support", "Battery Optimization", "Service Persistence", "Auto-Start on Boot"]
        },
        {
            icon: <Layers className="w-10 h-10 text-purple-400" />,
            title: "Smart Queueing",
            description: "Intelligent message distribution across multiple devices. Handles peaks and valleys in traffic without dropping messages.",
            points: ["Deduplication", "Priority Routing", "Multi-Device Load Balancing", "Retrials Manager"]
        },
        {
            icon: <Shield className="w-10 h-10 text-green-400" />,
            title: "Privacy First",
            description: "Your data never leaves your infrastructure. Full control over message logs and device secrets.",
            points: ["BfE Encryption", "Local Logs Control", "No Third-party Monitoring", "Owner-only Access"]
        },
        {
            icon: <Zap className="w-10 h-10 text-yellow-500" />,
            title: "Low Latency Relay",
            description: "Ultra-fast websocket communication between our cloud and your devices ensures near-instant delivery.",
            points: ["<200ms Relay Time", "Real-time Status Sync", "Heartbeat Monitoring", "Instant Webhooks"]
        },
        {
            icon: <BarChart3 className="w-10 h-10 text-pink-400" />,
            title: "Advanced Analytics",
            description: "Monitor your SMS volume, delivery rates, and device health with our comprehensive stats dashboard.",
            points: ["Delivery Success Rate", "Volume Over Time", "Device Performance", "Message History"]
        },
        {
            icon: <Cloud className="w-10 h-10 text-cyan-400" />,
            title: "SaaS-Ready Architecture",
            description: "Scale from a single device to a full-blown commercial SMS service with our multi-tenant ready backend.",
            points: ["Isolated User Spaces", "API Key Management", "Unlimited Scaling", "Merchant Controls"]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

                {/* Hero Section */}
                <section className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                            Powerful Features for <br />
                            <span className="text-blue-500">Total SMS Control</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Everything you need to build, scale, and manage your own private SMS infrastructure
                            without the monthly subscriptions or per-message fees.
                        </p>
                    </motion.div>
                </section>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all group"
                        >
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">{f.icon}</div>
                            <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                            <p className="text-gray-400 mb-8 flex-grow">{f.description}</p>
                            <ul className="space-y-3 border-t border-white/5 pt-6">
                                {f.points.map((p, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400" /> {p}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <section className="mt-32 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 p-12 text-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control?</h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                            Join thousands of developers building their own SMS solutions.
                            Start for free with your existing device.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all">
                                Get Started Now
                            </Link>
                            <Link href="/docs" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all">
                                Check Documentation
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
