import { X, Loader2 } from "lucide-react";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import api from "../app/utils/api";

interface AddDeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeviceAdded?: () => void;
    apiKey: string | null;
    deviceId?: number | null;
}

export default function AddDeviceModal({ isOpen, onClose, onDeviceAdded, apiKey, deviceId }: AddDeviceModalProps) {
    const [initialCount, setInitialCount] = useState<number | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Get initial count when modal opens
            api.get("/api/dashboard/devices").then(res => {
                setInitialCount(res.data.length);
            });
        } else {
            setInitialCount(null);
        }
    }, [isOpen]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isOpen && initialCount !== null) {
            interval = setInterval(async () => {
                try {
                    setIsChecking(true);
                    const res = await api.get("/api/dashboard/devices");

                    let isReactivated = false;
                    if (deviceId) {
                        const currentDevice = res.data.find((d: any) => d.id === deviceId);
                        if (currentDevice?.active) isReactivated = true;
                    }

                    if (res.data.length > initialCount || isReactivated) {
                        // New device detected or existing one reactivated!
                        if (onDeviceAdded) onDeviceAdded();
                        onClose();
                    }
                } catch (error) {
                    console.error("Error polling for devices:", error);
                } finally {
                    setIsChecking(false);
                }
            }, 3000);
        }

        return () => clearInterval(interval);
    }, [isOpen, initialCount, onClose, onDeviceAdded]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        Link New Device
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Open the BitText Android App and scan this QR code to instantly link your device.
                    </p>
                </div>

                <div className="flex justify-center mb-8 p-4 bg-white rounded-xl w-fit mx-auto relative">
                    {apiKey ? (
                        <>
                            <QRCode
                                value={`BitText APIKEY=${apiKey}${deviceId ? `&DEVICE_ID=${deviceId}` : ''}`}
                                size={200}
                                className="w-full h-auto"
                            />
                            {isChecking && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl">
                                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
                            No API Key
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Manual Entry</p>
                        <code className="text-sm font-mono text-blue-400 break-all select-all">
                            {apiKey || "Generate an API Key first"}
                        </code>
                    </div>

                    <p className="text-center text-[10px] text-gray-500 animate-pulse">
                        Waiting for connection...
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
