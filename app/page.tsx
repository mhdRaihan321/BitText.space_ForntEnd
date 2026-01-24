"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Code, Zap, Key } from "lucide-react";
import { motion } from "framer-motion";
import { useRequireAuth } from "./hooks/useRequireAuth";
import Dashboard from "./dashboard/page";

interface User {
  id: number;
  name: string;
  email: string;
  api_key: string | null;
}

export default function Home() {
  const { user, isAuthenticated } = useRequireAuth<User>(false);
  const [selectedLang, setSelectedLang] = useState("python");

  const snippets: { [key: string]: { code: string, file: string } } = {
    python: {
      file: "send_sms.py",
      code: `import requests

url = "https://api.bittext.iamraihan.site/api/sms/send"
headers = {
    "x-api-key": "your_api_key",
    "Content-Type": "application/json"
}
payload = {
    "to": "+1234567890",
    "message": "Hello from BitText!",
    "deviceId": 42
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`
    },
    javascript: {
      file: "send_sms.js",
      code: `const axios = require('axios');

async function sendSMS() {
  try {
    const response = await axios.post('https://api.bittext.iamraihan.site/api/sms/send', {
      to: '+1234567890',
      message: 'Hello from BitText!',
      deviceId: 42
    }, {
      headers: {
        'x-api-key': 'your_api_key',
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

sendSMS();`
    },
    curl: {
      file: "terminal",
      code: `curl -X POST https://api.bittext.iamraihan.site/api/sms/send \\
     -H "x-api-key: your_api_key" \\
     -H "Content-Type: application/json" \\
     -d '{
           "to": "+1234567890",
           "message": "Hello from BitText!",
           "deviceId": 42
         }'`
    }
  };

  const showDashornot = () => {
    if (isAuthenticated) {
      return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/dashboard" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20">
            Go to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      );
    }
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group">
          Start Building <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link href="/docs" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
          Read Documentation
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                v1.0 is now available
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                Turn your Android into an <br />
                <span className="text-blue-500">SMS Gateway</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Send and receive SMS programmatically using your own device.
                Full control, no monthly fees, and completely open source.
              </p>
              {showDashornot()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 relative bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">How it Works</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Start sending messages in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                <Smartphone className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">1. Install the App</h3>
              <p className="text-gray-400 leading-relaxed">Download the BitText app on your Android device and sign in to get started.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                <Smartphone className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">2. Link Device</h3>
              <p className="text-gray-400 leading-relaxed">Scan the dashboard QR code to securely bridge your phone to our cloud relay.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-green-500/20 group-hover:scale-110 transition-transform duration-500">
                <Code className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">3. Send SMS</h3>
              <p className="text-gray-400 leading-relaxed">Use our simple REST API or the web dashboard to send messages instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Twilio Comparison Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">BitText vs Traditional</h2>
            <p className="text-gray-400 text-lg">Why pay more for less transparency?</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-8 font-bold text-gray-300">Feature</th>
                  <th className="p-8 font-bold text-blue-400 text-xl">BitText</th>
                  <th className="p-8 font-bold text-gray-500">Twilio / Vonage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-lg">
                <tr>
                  <td className="p-8 text-gray-400">Cost per SMS</td>
                  <td className="p-8 font-medium text-white">Free (Carrier limited)</td>
                  <td className="p-8 text-gray-500">$0.0079+</td>
                </tr>
                <tr>
                  <td className="p-8 text-gray-400">Privacy</td>
                  <td className="p-8 font-medium text-green-400">End-to-End Ownership</td>
                  <td className="p-8 text-gray-500">Centralized log access</td>
                </tr>
                <tr>
                  <td className="p-8 text-gray-400">Setup Time</td>
                  <td className="p-8 font-medium text-white">Under 2 mins</td>
                  <td className="p-8 text-gray-500">Business verification</td>
                </tr>
                <tr>
                  <td className="p-8 text-gray-400">Monthly Fees</td>
                  <td className="p-8 font-medium text-white">$0</td>
                  <td className="p-8 text-gray-500">$1 - $15+ per number</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-24 bg-blue-600/[0.03] border-y border-blue-500/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white">Built for Developers</h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Scale your communication without the red tape. Our RESTful API gives you
              full control over your SMS infrastructure with Zero configuration.
            </p>
            <div className="space-y-6 mb-12 text-lg text-gray-400">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-blue-400 mt-1 shrink-0" />
                <p><span className="text-white font-medium">Sub-second API response</span> for high-frequency messaging apps.</p>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-blue-400 mt-1 shrink-0" />
                <p><span className="text-white font-medium">Real-time Webhooks</span> for instant delivery status and incoming SMS.</p>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-blue-400 mt-1 shrink-0" />
                <p><span className="text-white font-medium">Simple Auth</span> using standard API keys and X-header headers.</p>
              </div>
            </div>
            <Link href="/docs" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 transition-all group">
              Explore API Docs <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden">
              <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10 px-6">
                <div className="flex gap-4">
                  <button onClick={() => setSelectedLang("python")} className={`text-xs font-mono transition-colors ${selectedLang === 'python' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-400'}`}>Python</button>
                  <button onClick={() => setSelectedLang("javascript")} className={`text-xs font-mono transition-colors ${selectedLang === 'javascript' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-400'}`}>Node.js</button>
                  <button onClick={() => setSelectedLang("curl")} className={`text-xs font-mono transition-colors ${selectedLang === 'curl' ? 'text-blue-400' : 'text-gray-500 hover:text-gray-400'}`}>cURL</button>
                </div>
                <span className="text-xs text-gray-500 font-mono">{snippets[selectedLang].file}</span>
              </div>
              <pre className="p-8 text-sm font-mono text-gray-300 bg-black/50 overflow-x-auto leading-relaxed min-h-[300px]">
                {snippets[selectedLang].code}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">Premium Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Enterprise-grade capabilities for everyone.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Smartphone className="w-8 h-8 text-blue-500" />}
              title="Android Gateway"
              description="Native performance with background persistence. Optimized for long-term usage and stability."
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-blue-500" />}
              title="Cloud Orchestration"
              description="Manage multiple devices worldwide from a single central dashboard with real-time status."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-blue-500" />}
              title="Webhook Ready"
              description="Configure custom endpoints to receive SMS data and delivery reports automatically."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
