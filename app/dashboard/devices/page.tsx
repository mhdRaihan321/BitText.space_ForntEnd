"use client";

import { useDashboard } from "../../context/DashboardContext";
import { useEffect } from "react";
import { Smartphone, Plus, Link as LinkIcon, Trash2 } from "lucide-react";

export default function DevicesPage() {
    const { devices, setIsAddDeviceModalOpen, setSelectedDeviceId, handleDeleteDevice, fetchDashboardData } = useDashboard();

    const formatLastSeen = (dateString: string) => {
        if (!dateString) return "Never";
        return new Date(dateString).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchDashboardData();
        }, 10000); // Poll every 10 seconds
        return () => clearInterval(interval);
    }, [fetchDashboardData]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Devices
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your connected Android gateways</p>
                </div>
                <button
                    onClick={() => {
                        setSelectedDeviceId(null);
                        setIsAddDeviceModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                >
                    <Plus className="w-4 h-4" /> Link Device
                </button>
            </div>

            <div className="bg-[#111115] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                {devices.length === 0 ? (
                    <div className="p-16 text-center text-gray-500">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Smartphone className="w-10 h-10 opacity-30" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No Devices Linked</h3>
                        <p>Download the app and scan your API key to get started.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {devices.map(device => (
                            <div key={device.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                        <Smartphone className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">{device.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className={`w-1.5 h-1.5 rounded-full ${device.active
                                                ? (device.status === 'SLEEPING' ? 'bg-yellow-500' : 'bg-green-500')
                                                : 'bg-red-500'
                                                }`} />
                                            <p className="text-xs text-gray-400 font-medium">Last seen: {formatLastSeen(device.last_seen || "")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${device.active
                                        ? (device.status === 'SLEEPING' ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20")
                                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                                        }`}>
                                        {device.active ? (device.status === 'SLEEPING' ? "Sleeping" : "Online") : "Offline"}
                                    </div>
                                    {!device.active && (
                                        <button
                                            onClick={() => {
                                                setSelectedDeviceId(device.id);
                                                setIsAddDeviceModalOpen(true);
                                            }}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-xs font-bold transition-all animate-pulse"
                                            title="Reconnect Device"
                                        >
                                            <LinkIcon className="w-3 h-3" />
                                            Link Again
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteDevice(device.id)}
                                        className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                        title="Remove Device"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
