"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../utils/api";
import { useRequireAuth } from "../hooks/useRequireAuth";

export interface User {
    id: number;
    name: string;
    email: string;
    api_key: string | null;
}

export interface Stats {
    deviceCount: number;
    smsCount: number;
}

export interface Device {
    id: number;
    name: string;
    active: boolean;
    last_seen?: string;
    secret?: string;
}

export interface Sms {
    id: number;
    to: string;
    message: string;
    status: string;
    createdAt: string;
}

interface DashboardContextType {
    user: User | null;
    stats: Stats;
    devices: Device[];
    smsLogs: Sms[];
    loading: boolean;
    isAddDeviceModalOpen: boolean;
    setIsAddDeviceModalOpen: (open: boolean) => void;
    selectedDeviceId: number | null;
    setSelectedDeviceId: (id: number | null) => void;
    fetchDashboardData: () => Promise<void>;
    handleDeleteDevice: (id: number) => Promise<void>;
    generateApiKey: () => Promise<void>;
    setUser: (user: User | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, setUser } = useRequireAuth<User>();
    const [stats, setStats] = useState<Stats>({ deviceCount: 0, smsCount: 0 });
    const [devices, setDevices] = useState<Device[]>([]);
    const [smsLogs, setSmsLogs] = useState<Sms[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
    const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

    const fetchDashboardData = useCallback(async () => {
        if (!isAuthenticated || !user) return;

        try {
            setLoading(true);
            const [statsRes, devicesRes, smsRes] = await Promise.all([
                api.get("/api/dashboard/stats"),
                api.get("/api/dashboard/devices"),
                api.get("/api/dashboard/sms")
            ]);

            setStats(statsRes.data);
            setDevices(devicesRes.data);
            setSmsLogs(smsRes.data);
        } catch (error) {
            console.error("Error fetching dashboard data", error);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (isAuthenticated && user) {
            fetchDashboardData();
        }
    }, [isAuthenticated, user, fetchDashboardData]);

    const handleDeleteDevice = async (id: number) => {
        if (!confirm("Are you sure you want to remove this device? This action cannot be undone.")) return;
        try {
            await api.delete(`/api/dashboard/devices/${id}`);
            await fetchDashboardData();
        } catch (error) {
            console.error("Error deleting device", error);
            alert("Failed to delete device");
        }
    };

    const generateApiKey = async () => {
        try {
            const res = await api.post("/api/user/generate-api-key");
            if (user) {
                const updatedUser = { ...user, api_key: res.data.api_key };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Error generating API key", error);
            alert("Failed to generate API Key");
        }
    };

    return (
        <DashboardContext.Provider value={{
            user,
            stats,
            devices,
            smsLogs,
            loading,
            isAddDeviceModalOpen,
            setIsAddDeviceModalOpen,
            selectedDeviceId,
            setSelectedDeviceId,
            fetchDashboardData,
            handleDeleteDevice,
            generateApiKey,
            setUser
        }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
}
