"use client";

import React from "react";

export function StatsCard({ label, value, icon: Icon, trend, color }: { label: string, value: string, icon: any, trend: string, color: string }) {
    const colors: any = {
        blue: "text-blue-400 bg-blue-500/10",
        green: "text-green-400 bg-green-500/10",
        purple: "text-purple-400 bg-purple-500/10",
        emerald: "text-emerald-400 bg-emerald-500/10",
    }

    const glowColors: any = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        emerald: "bg-emerald-500",
    }

    return (
        <div className="bg-[#111115] border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden group hover:border-white/10 transition-all shadow-lg hover:-translate-y-1">
            <div className={`absolute top-0 right-0 p-24 rounded-full opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2 ${glowColors[color]}`} />

            <div className="flex justify-between items-start relative z-10">
                <span className="text-sm text-gray-400 font-medium">{label}</span>
                <div className={`p-2.5 rounded-lg ${colors[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">{trend}</p>
            </div>
        </div>
    )
}

export function StatusBadge({ status }: { status: string }) {
    if (status === 'SENT') {
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">SENT</span>;
    } else if (status === 'FAILED') {
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">FAILED</span>;
    } else {
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">{status}</span>;
    }
}
