"use client";

import { useDashboard } from "../../../context/DashboardContext";
import { useEffect } from "react";
import { RefreshCw, Send, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import { StatusBadge } from "../../../../components/DashboardComponents";
import Link from "next/link";

const { smsLogs, fetchDashboardData } = useDashboard();

useEffect(() => {
    const interval = setInterval(() => {
        fetchDashboardData();
    }, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
}, [fetchDashboardData]);

return (
    < div className="space-y-6" >
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Message History
                </h1>
                <p className="text-gray-500 mt-1">View all your sent messages</p>
            </div>
            <div className="flex gap-3">
                <Link
                    href="/dashboard/messages"
                    className="px-4 py-2 bg-[#111115] border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
                >
                    <Send className="w-4 h-4" /> New Message
                </Link>
                <button
                    onClick={fetchDashboardData}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>
        </div>

        <div className="bg-[#111115] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider bg-white/5">
                            <th className="py-5 pl-8 font-medium">Recipient</th>
                            <th className="py-5 font-medium">Message Body</th>
                            <th className="py-5 font-medium">Status</th>
                            <th className="py-5 text-right pr-8 font-medium">Sent At</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-white/5">
                        {smsLogs.length > 0 ? (
                            smsLogs.map(log => (
                                <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="py-5 pl-8 font-mono text-blue-300 text-xs">{log.to}</td>
                                    <td className="py-5 text-gray-400 max-w-sm truncate group-hover:text-gray-200">{log.message}</td>
                                    <td className="py-5"><StatusBadge status={log.status} /></td>
                                    <td className="py-5 text-right pr-8 text-gray-500 text-xs tabular-nums">{new Date(log.createdAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-gray-500">
                                    No messages found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div >

)