"use client";

import { useDashboard } from "../../context/DashboardContext";
import { useState } from "react";
import { Send, History, Smartphone, RefreshCw, Layers } from "lucide-react";
import api from "../../utils/api";
import { StatusBadge } from "../../../components/DashboardComponents";

export default function MessagesPage() {
    const { user, devices, smsLogs, fetchDashboardData } = useDashboard();
    const [messagingSubTab, setMessagingSubTab] = useState("send");
    const [sendForm, setSendForm] = useState({
        deviceId: devices.length > 0 ? devices[0].id.toString() : "",
        to: "",
        message: ""
    });
    const [sending, setSending] = useState(false);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sendForm.deviceId) { alert("Please select a device"); return; }
        if (!sendForm.to.trim()) { alert("Please enter a recipient"); return; }
        if (!sendForm.message.trim()) { alert("Please enter a message"); return; }

        setSending(true);
        try {
            await api.post("/api/sms/send", {
                to: sendForm.to.trim(),
                messagetype: "SMS",
                message: sendForm.message.trim(),
                deviceId: sendForm.deviceId
            }, {
                headers: { 'x-api-key': user?.api_key || '' }
            });
            alert("Message Sent!");
            setSendForm({ ...sendForm, to: "", message: "" });
            fetchDashboardData();
        } catch (error) {
            console.error("Error sending message", error);
            alert("Failed to send message.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Messaging
                </h1>
                <p className="text-gray-500 mt-1">Send single messages or view history</p>
            </div>

            <div className="bg-[#111115] p-1.5 rounded-xl border border-white/5 inline-flex shadow-lg">
                {[
                    { id: "send", label: "Send Message", icon: Send },
                    { id: "history", label: "History", icon: History }
                ].map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setMessagingSubTab(tab.id)}
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${messagingSubTab === tab.id
                                ? "bg-white/10 text-white shadow-sm border border-white/5"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {messagingSubTab === "send" ? (
                <div className="bg-[#111115] border border-white/5 rounded-2xl p-8 shadow-xl max-w-3xl">
                    <form onSubmit={handleSendMessage} className="space-y-6">
                        <div className="space-y-2.5">
                            <label className="text-sm font-medium text-gray-300">Sending Device</label>
                            <div className="relative">
                                <select
                                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer hover:border-white/20 transition-colors"
                                    value={sendForm.deviceId}
                                    onChange={e => setSendForm({ ...sendForm, deviceId: e.target.value })}
                                >
                                    <option value="" disabled>Select a device</option>
                                    {devices.map(d => (
                                        <option key={d.id} value={d.id}>{d.name} • {d.active ? '🟢 Online' : '🔴 Offline'}</option>
                                    ))}
                                </select>
                                <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-sm font-medium text-gray-300">Recipient Number</label>
                            <input
                                type="text"
                                placeholder="+1 (555) 000-0000"
                                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500/50 hover:border-white/20 transition-colors font-mono"
                                value={sendForm.to}
                                onChange={e => setSendForm({ ...sendForm, to: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-sm font-medium text-gray-300">Message Content</label>
                            <textarea
                                rows={6}
                                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500/50 resize-none hover:border-white/20 transition-colors leading-relaxed"
                                placeholder="Type your message here..."
                                value={sendForm.message}
                                onChange={e => setSendForm({ ...sendForm, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-[0.99]"
                        >
                            {sending ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            {sending ? "Dispatching..." : "Send Message"}
                        </button>
                    </form>
                </div>
            ) : (
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
                                {smsLogs.map(log => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="py-5 pl-8 font-mono text-blue-300 text-xs">{log.to}</td>
                                        <td className="py-5 text-gray-400 max-w-sm truncate group-hover:text-gray-200">{log.message}</td>
                                        <td className="py-5"><StatusBadge status={log.status} /></td>
                                        <td className="py-5 text-right pr-8 text-gray-500 text-xs tabular-nums">{new Date(log.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
