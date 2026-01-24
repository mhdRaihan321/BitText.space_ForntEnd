"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Copy, Terminal, Zap, Smartphone, Key, Code, Book, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";

export default function Docs() {
    const { loading, isAuthenticated } = useRequireAuth();
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    if (loading || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Sidebar Navigation */}
                    <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Getting Started</h3>
                            <nav className="space-y-2">
                                <a href="#introduction" className="block text-gray-400 hover:text-blue-400 transition-colors">Introduction</a>
                                <a href="#authentication" className="block text-gray-400 hover:text-blue-400 transition-colors">Authentication</a>
                                <a href="#base-url" className="block text-gray-400 hover:text-blue-400 transition-colors">Base URL</a>
                            </nav>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Endpoints</h3>
                            <nav className="space-y-2">
                                <a href="#send-sms" className="block text-gray-400 hover:text-blue-400 transition-colors">Send SMS</a>
                                <a href="#sms-status" className="block text-gray-400 hover:text-blue-400 transition-colors">SMS Status</a>
                                <a href="#sms-recipients" className="block text-gray-400 hover:text-blue-400 transition-colors">Recipients</a>
                                <a href="#sms-history" className="block text-gray-400 hover:text-blue-400 transition-colors">SMS History</a>
                                <a href="#list-devices" className="block text-gray-400 hover:text-blue-400 transition-colors">List Devices</a>
                                <a href="#register-device" className="block text-gray-400 hover:text-blue-400 transition-colors">Register Device</a>
                            </nav>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Guides</h3>
                            <nav className="space-y-2">
                                <a href="#webhooks" className="block text-gray-400 hover:text-blue-400 transition-colors">Webhooks</a>
                                <a href="#error-codes" className="block text-gray-400 hover:text-blue-400 transition-colors">Error Codes</a>
                            </nav>
                        </div>
                    </aside>

                    {/* Documentation Content */}
                    <div className="lg:col-span-3 space-y-20">

                        {/* Introduction */}
                        <section id="introduction">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">API Documentation</h1>
                            <p className="text-xl text-gray-400 leading-relaxed mb-8">
                                Welcome to the BitText API. Our API allows you to send and receive SMS messages using your own Android device
                                programmatically. It's designed to be simple, reliable, and developer-friendly.
                            </p>
                            <div className="p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex gap-4">
                                <AlertCircle className="w-6 h-6 text-blue-400 shrink-0" />
                                <p className="text-blue-100 italic">
                                    Note: All requests must be made over HTTPS. The API uses JSON for request and response bodies.
                                </p>
                            </div>
                        </section>

                        {/* Authentication */}
                        <section id="authentication" className="pt-10 scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Key className="w-8 h-8 text-blue-400" /> Authentication
                            </h2>
                            <p className="text-gray-400 mb-6">
                                BitText uses API keys to authenticate requests. You can find your API key in the
                                <a href="/dashboard" className="text-blue-400 hover:underline mx-1">dashboard</a> settings.
                            </p>
                            <p className="text-gray-400 mb-6">
                                Include your API key in the <code className="text-blue-300 font-mono bg-white/5 px-2 py-1 rounded">x-api-key</code> HTTP header for all requests.
                            </p>
                            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 overflow-hidden">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-500 font-mono uppercase tracking-widest">Example Header</span>
                                    <button
                                        onClick={() => handleCopy("x-api-key: your_api_key_here", "auth-header")}
                                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                        {copied === "auth-header" ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied === "auth-header" ? "Copied" : "Copy"}
                                    </button>
                                </div>
                                <code className="text-gray-300 font-mono block whitespace-pre-wrap">
                                    x-api-key: your_api_key_here
                                </code>
                            </div>
                        </section>

                        {/* Base URL */}
                        <section id="base-url" className="pt-10 scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Terminal className="w-8 h-8 text-blue-400" /> Base URL
                            </h2>
                            <p className="text-gray-400 mb-4">All API requests should be made to the following base URL:</p>
                            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl font-mono text-blue-300 flex justify-between items-center">
                                <span>https://api.bittext.iamraihan.site/api</span>
                                <button onClick={() => handleCopy("https://api.bittext.iamraihan.site/api", "base-url")} className="text-gray-500 hover:text-white transition-colors">
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </section>

                        {/* Send SMS Endpoint */}
                        <section id="send-sms" className="pt-10 scroll-mt-32 space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-extrabold rounded-md uppercase tracking-widest">POST</span>
                                <h2 className="text-3xl font-bold">/sms/send</h2>
                            </div>
                            <p className="text-gray-400">Sends an SMS message through a registered and active device.</p>

                            <h3 className="text-xl font-bold text-white mt-8">Body Parameters</h3>
                            <div className="border border-white/10 rounded-2xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="p-4 text-sm font-bold text-gray-400">Parameter</th>
                                            <th className="p-4 text-sm font-bold text-gray-400">Type</th>
                                            <th className="p-4 text-sm font-bold text-gray-400">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <tr>
                                            <td className="p-4 font-mono text-blue-300 text-sm">to</td>
                                            <td className="p-4 text-gray-500 text-sm italic">string</td>
                                            <td className="p-4 text-gray-300 text-sm">Recipient's phone number in E.164 format.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-mono text-blue-300 text-sm">message</td>
                                            <td className="p-4 text-gray-500 text-sm italic">string</td>
                                            <td className="p-4 text-gray-300 text-sm">The content of the SMS. Max 160 chars per segment.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-mono text-blue-300 text-sm">deviceId</td>
                                            <td className="p-4 text-gray-500 text-sm italic">integer</td>
                                            <td className="p-4 text-gray-300 text-sm">Optional. ID of the device to use.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-mono text-blue-300 text-sm">messagetype</td>
                                            <td className="p-4 text-gray-500 text-sm italic">string</td>
                                            <td className="p-4 text-gray-300 text-sm">Optional. Use "OTP" to auto-format as an OTP message.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Request Payload</h4>
                                    <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-blue-300">
                                        {`{
  "to": "+15550109999",
  "message": "Hello World!",
  "deviceId": 7,
  "messagetype": "SMS"
}`}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Response Body</h4>
                                    <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-green-400">
                                        {`{
  "success": true,
  "sms_id": 1024,
  "status": "QUEUED"
}`}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SMS Status Endpoint */}
                        <section id="sms-status" className="pt-10 scroll-mt-32 space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-extrabold rounded-md uppercase tracking-widest">GET</span>
                                <h2 className="text-3xl font-bold">/sms/status/:id</h2>
                            </div>
                            <p className="text-gray-400">Get the delivery status of a previously sent SMS.</p>

                            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-green-400">
                                {`{
  "status": "SENT"
}`}
                            </div>
                            <p className="text-sm text-gray-500 italic">Possible status values: QUEUED, SENDING, SENT, FAILED.</p>
                        </section>

                        {/* List Devices Endpoint */}
                        <section id="list-devices" className="pt-10 scroll-mt-32 space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-extrabold rounded-md uppercase tracking-widest">GET</span>
                                <h2 className="text-3xl font-bold">/device/list</h2>
                            </div>
                            <p className="text-gray-400">Retrieve a list of all your registered devices.</p>

                            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-green-400">
                                {`[
  {
    "id": 7,
    "name": "My Android Phone",
    "active": true,
    "last_seen": "2026-01-24T12:00:00Z"
  }
]`}
                            </div>
                        </section>

                        {/* Recipients Endpoint */}
                        <section id="sms-recipients" className="pt-10 scroll-mt-32 space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-extrabold rounded-md uppercase tracking-widest">GET</span>
                                <h2 className="text-3xl font-bold">/sms/recipients</h2>
                            </div>
                            <p className="text-gray-400">Gets a unique list of past recipients (phone numbers).</p>

                            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-green-400">
                                {`[
  {"to": "+15550109999"},
  {"to": "+15550108888"}
]`}
                            </div>
                        </section>

                        {/* Register Device Endpoint */}
                        <section id="register-device" className="pt-10 scroll-mt-32 space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-extrabold rounded-md uppercase tracking-widest">POST</span>
                                <h2 className="text-3xl font-bold">/device/register</h2>
                            </div>
                            <p className="text-gray-400">Register a new device or re-link an existing one.</p>

                            <h3 className="text-xl font-bold text-white mt-8">Body Parameters</h3>
                            <div className="border border-white/10 rounded-2xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="p-4 text-sm font-bold text-gray-400">Parameter</th>
                                            <th className="p-4 text-sm font-bold text-gray-400">Type</th>
                                            <th className="p-4 text-sm font-bold text-gray-400">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <tr>
                                            <td className="p-4 font-mono text-blue-300 text-sm">name</td>
                                            <td className="p-4 text-gray-500 text-sm italic">string</td>
                                            <td className="p-4 text-gray-300 text-sm">Display name for the device.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-mono text-blue-300 text-sm">api_key</td>
                                            <td className="p-4 text-gray-500 text-sm italic">string</td>
                                            <td className="p-4 text-gray-300 text-sm">Optional. API key to link device to your account.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-mono text-blue-300 text-sm">device_id</td>
                                            <td className="p-4 text-gray-500 text-sm italic">string</td>
                                            <td className="p-4 text-gray-300 text-sm">Optional. ID of an existing device to re-link.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Request Payload</h4>
                                    <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-blue-300">
                                        {`{
  "name": "My New Device",
  "api_key": "your_api_key_here"
}`}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Response Body</h4>
                                    <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-green-400">
                                        {`{
  "device_id": 42,
  "device_secret": "ds_..."
}`}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Error Codes */}
                        <section id="error-codes" className="pt-10 scroll-mt-32">
                            <h2 className="text-3xl font-bold mb-8">Error Codes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { code: '401', message: 'API key is required or invalid.' },
                                    { code: '400', message: 'Missing required fields or invalid format.' },
                                    { code: '404', message: 'Requested resource not found.' },
                                    { code: '500', message: 'Internal server error.' },
                                    { code: '422', message: 'Device is offline or inactive.' },
                                    { code: '429', message: 'Rate limit exceeded.' },
                                ].map((err, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <span className="w-12 text-sm font-bold text-red-400 uppercase">{err.code}</span>
                                        <span className="text-gray-400 text-sm">{err.message}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer Note */}
                        <section className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-gray-500 text-sm">
                                Need more help? Join our <a href="#" className="text-blue-400 hover:underline">Discord community</a> or check the <a href="https://github.com/raihan77/BitText" className="text-blue-400 hover:underline">Open Source Repo</a>.
                            </p>
                            <div className="flex gap-4">
                                <a href="/features" className="text-sm font-bold text-white hover:text-blue-400 transition-colors">Features</a>
                                <a href="/dashboard" className="text-sm font-bold text-white hover:text-blue-400 transition-colors">Dashboard</a>
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
