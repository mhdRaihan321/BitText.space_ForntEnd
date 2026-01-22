"use client";

import { useDashboard } from "../../context/DashboardContext";
import { Key, Copy, Activity } from "lucide-react";

export default function SettingsPage() {
    const { user, generateApiKey } = useDashboard();

    const copyToClipboard = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        alert("Copied!");
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Settings
                </h1>
                <p className="text-gray-500 mt-1">Configure your account and API access</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111115] border border-white/5 shadow-xl">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-white">API Configuration</h2>
                        <p className="text-gray-400 text-sm mt-1">Manage your API Access Key for external integrations.</p>
                    </div>
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Key className="w-6 h-6 text-purple-400" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-[#050505] p-5 rounded-xl border border-white/10 group focus-within:border-blue-500/50 transition-colors">
                        <code className="flex-1 text-sm text-gray-300 font-mono break-all group-hover:text-white transition-colors">
                            {user?.api_key || "No API Key generated yet."}
                        </code>
                        {user?.api_key && (
                            <button
                                onClick={() => copyToClipboard(user.api_key!)}
                                className="p-2.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-xs text-red-400/80 flex items-center gap-2">
                            <Activity className="w-3 h-3" />
                            Keep your key private. Regenerate if compromised.
                        </p>
                        <button
                            onClick={generateApiKey}
                            className="text-sm text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline transition-all"
                        >
                            {user?.api_key ? "Regenerate Secret Key" : "Generate Secret Key"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
