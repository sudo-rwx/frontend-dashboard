"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [autopilot, setAutopilot] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.metrics);
      });

    fetch('/api/workflows')
      .then((res) => res.json())
      .then((data) => {
        setWorkflows(data.workflows);
      });

    setMessages([
      {
        role: 'customer',
        text: 'Can AI automate my leads?'
      },
      {
        role: 'ai',
        text: 'Yes. Gemini AI automation is now active.'
      }
    ]);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'customer',
      text: input
    };

    const aiMessage = {
      role: 'ai',
      text: `Gemini AI automation processed: ${input}`
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput('');
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="border-b border-zinc-900 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gemini Automation OS</h1>
            <p className="text-zinc-500 text-sm">AI Business Operating System</p>
          </div>

          <button
            onClick={() => setAutopilot(!autopilot)}
            className={`px-5 py-3 rounded-2xl font-semibold transition ${
              autopilot
                ? 'bg-green-500 text-black'
                : 'bg-zinc-900 text-white'
            }`}
          >
            {autopilot ? 'AI ONLINE' : 'AI OFFLINE'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <p className="text-zinc-500">AI Replies</p>
            <h2 className="text-5xl font-bold mt-3">
              {metrics?.aiReplies || 0}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <p className="text-zinc-500">Active Leads</p>
            <h2 className="text-5xl font-bold mt-3">
              {metrics?.activeLeads || 0}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <p className="text-zinc-500">Revenue</p>
            <h2 className="text-5xl font-bold mt-3">
              ${metrics?.revenue || 0}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <p className="text-zinc-500">Automation Rate</p>
            <h2 className="text-5xl font-bold mt-3">
              {metrics?.automationRate || 0}%
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">Realtime AI Inbox</h2>
                <p className="text-zinc-500 mt-2">
                  Live Gemini customer automation.
                </p>
              </div>

              <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">
                LIVE
              </div>
            </div>

            <div className="space-y-4 h-[450px] overflow-y-auto mb-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-2xl max-w-[85%] ${
                    message.role === 'ai'
                      ? 'bg-green-500 text-black ml-auto'
                      : 'bg-black border border-zinc-800'
                  }`}
                >
                  <p className="font-semibold mb-2">
                    {message.role === 'ai' ? 'Gemini AI' : 'Customer'}
                  </p>
                  <p>{message.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send customer message"
                className="flex-1 bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
              />

              <button
                onClick={sendMessage}
                className="bg-white text-black px-6 rounded-2xl font-bold"
              >
                Send
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
              <h2 className="text-3xl font-bold mb-6">Automation Center</h2>

              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="bg-black rounded-2xl p-5 border border-zinc-800"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{workflow.name}</p>
                        <p className="text-zinc-500 text-sm">
                          {workflow.trigger} → {workflow.action}
                        </p>
                      </div>

                      <span className="text-green-400">
                        {workflow.enabled ? 'Running' : 'Offline'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
              <p className="text-zinc-500 mb-2">System Status</p>
              <h3 className="text-4xl font-bold text-green-400">
                {autopilot ? 'FULLY OPERATIONAL' : 'OFFLINE'}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
