"use client";

import { useDashboard } from "../../context/DashboardContext";
import { Zap, Download, Key, Send, Smartphone, Activity, Layers, Plus, Copy } from "lucide-react";
import { StatsCard } from "../../../components/DashboardComponents";

export default function OverviewPage() {
    const { user, stats, generateApiKey, fetchDashboardData } = useDashboard();

    const copyToClipboard = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        alert("Copied!");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Overview
                </h1>
                <p className="text-gray-500 mt-1">Welcome back, {user?.name}</p>
            </div>

            {/* Quick Start Guide */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#111115] to-[#0f0f12] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-1.5 bg-blue-500/10 rounded-lg">
                            <Zap className="w-4 h-4 text-blue-400" />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Quick Start</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Step 1 */}
                        <div className="group">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-800 text-white flex items-center justify-center flex-shrink-0 font-bold border border-white/10 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors shadow-lg">1</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">Install App</h4>
                                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">Download the BitText Gateway app to your Android device to initialize the SMS bridge.</p>
                                    <button className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-lg border border-white/10 transition-all hover:scale-105 active:scale-95">
                                        <Download className="w-4 h-4" /> Download APK
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="group">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-800 text-white flex items-center justify-center flex-shrink-0 font-bold border border-white/10 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-colors shadow-lg">2</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1 group-hover:text-purple-400 transition-colors">Connect Device</h4>
                                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">Generate your unique API Key and scan the QR code to link your device instantly.</p>
                                    {!user?.api_key ? (
                                        <button onClick={generateApiKey} className="flex items-center gap-2 text-xs bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/20 font-medium">
                                            <Key className="w-4 h-4" /> Generate Key
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div className="bg-black/50 px-3 py-2 rounded-lg border border-white/10 flex-1 max-w-[200px]">
                                                <code className="text-xs text-blue-400 font-mono block truncate">
                                                    {user.api_key}
                                                </code>
                                            </div>
                                            <button onClick={() => copyToClipboard(user.api_key!)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"><Copy className="w-4 h-4" /></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    label="Total SMS Sent"
                    value={stats.smsCount.toString()}
                    icon={Send}
                    trend="Total lifetime"
                    color="blue"
                />
                <StatsCard
                    label="Active Devices"
                    value={stats.deviceCount.toString()}
                    icon={Smartphone}
                    trend="Live connection"
                    color="green"
                />
                <StatsCard
                    label="API Keys"
                    value={user?.api_key ? "1" : "0"}
                    icon={Key}
                    trend="Access Status"
                    color="purple"
                />
                <StatsCard
                    label="System Status"
                    value="99.9%"
                    icon={Activity}
                    trend="Uptime"
                    color="emerald"
                />
            </div>

            {/* Webhooks Section */}
            <div>
                <div className="flex items-center justify-between mt-10 mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                        Webhooks
                    </h2>
                </div>
                <div className="bg-[#111115] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center border-dashed">
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
                        <Layers className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">No webhooks configured</h3>
                    <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
                        Listen to real-time events like message status updates and incoming SMS by configuring a webhook URL.
                    </p>
                    <button className="bg-white text-black hover:bg-gray-200 font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Create Webhook
                    </button>
                </div>
            </div>
        </div>
    );
}
