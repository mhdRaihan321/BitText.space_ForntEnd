"use client";

import Navbar from "../../components/Navbar";
import { DashboardProvider, useDashboard } from "../context/DashboardContext";
import { Smartphone, MessageSquare, LogOut, Grid, Settings, Zap } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import AddDeviceModal from "../../components/AddDeviceModal";

function Sidebar() {
    const { user, loading, fetchDashboardData } = useDashboard();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        router.push("/login");
    };

    const SidebarItem = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`}
            >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
            </Link>
        );
    };

    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-[#0f0f12] border border-white/5 rounded-2xl p-4 sticky top-24 shadow-2xl shadow-black/50 backdrop-blur-xl">
                <div className="mb-8 px-4 mt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">BitText</span>
                    </div>
                    <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-white/5 rounded-lg border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-gray-400 font-medium">System Operational</span>
                    </div>
                </div>

                <nav className="space-y-1">
                    <SidebarItem href="/dashboard/overview" icon={Grid} label="Dashboard" />
                    <SidebarItem href="/dashboard/devices" icon={Smartphone} label="Devices" />
                    <SidebarItem href="/dashboard/messages" icon={MessageSquare} label="Messaging" />
                    <SidebarItem href="/dashboard/settings" icon={Settings} label="Settings" />
                </nav>

                <div className="mt-8 pt-6 border-t border-white/5 px-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors text-sm font-medium w-full px-2 py-2 hover:bg-red-500/10 rounded-lg"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
    const { user, isAddDeviceModalOpen, setIsAddDeviceModalOpen, selectedDeviceId, fetchDashboardData } = useDashboard();

    if (!user) return <div className="text-white text-center mt-32">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-blue-500/30">
            <Navbar />
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 pt-24 pb-12 flex flex-col lg:flex-row gap-8">
                <Sidebar />
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>

            <AddDeviceModal
                isOpen={isAddDeviceModalOpen}
                onClose={() => {
                    setIsAddDeviceModalOpen(false);
                    fetchDashboardData();
                }}
                onDeviceAdded={() => { }}
                apiKey={user?.api_key || ""}
                deviceId={selectedDeviceId}
            />
        </div>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardProvider>
            <DashboardContent>
                {children}
            </DashboardContent>
        </DashboardProvider>
    );
}
