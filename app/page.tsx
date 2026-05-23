"use client";

import { useState } from "react";

export default function HomePage() {
  const [messages, setMessages] = useState([
    {
      role: "customer",
      text: "Hello, can AI help automate my business?"
    },
    {
      role: "ai",
      text: "Yes — I can automate replies, lead conversion and customer engagement."
    }
  ]);

  const [input, setInput] = useState("");
  const [autopilot, setAutopilot] = useState(true);

  const stats = [
    { title: "AI Replies", value: "1,284" },
    { title: "Active Leads", value: "321" },
    { title: "Revenue", value: "$8,420" },
    { title: "Automation Rate", value: "92%" }
  ];

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "customer",
      text: input
    };

    const aiMessage = {
      role: "ai",
      text: `Gemini AI processed: ${input}`
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">
          <div>
            <p className="text-green-400 mb-2">SYSTEM ONLINE</p>
            <h1 className="text-5xl font-bold leading-tight">
              AI Social Automation Platform
            </h1>
            <p className="text-zinc-400 text-lg mt-4 max-w-2xl">
              AI employees handling customer support, lead generation,
              engagement and automated business workflows.
            </p>
          </div>

          <button
            onClick={() => setAutopilot(!autopilot)}
            className={`px-6 py-4 rounded-2xl font-bold transition ${
              autopilot
                ? "bg-green-500 text-black"
                : "bg-zinc-800 text-white"
            }`}
          >
            {autopilot ? "Autopilot Active" : "Autopilot Disabled"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >
              <p className="text-zinc-400">{stat.title}</p>
              <h2 className="text-4xl font-bold mt-3">{stat.value}</h2>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">Realtime AI Inbox</h2>
                <p className="text-zinc-400 mt-2">
                  Live customer conversations powered by Gemini AI.
                </p>
              </div>

              <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">
                Live
              </div>
            </div>

            <div className="space-y-4 h-[420px] overflow-y-auto pr-2 mb-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-2xl max-w-[85%] ${
                    message.role === "ai"
                      ? "bg-green-500 text-black ml-auto"
                      : "bg-zinc-950 border border-zinc-800"
                  }`}
                >
                  <p className="font-semibold mb-2">
                    {message.role === "ai" ? "Gemini AI" : "Customer"}
                  </p>
                  <p>{message.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send customer message..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 outline-none"
              />

              <button
                onClick={sendMessage}
                className="bg-white text-black px-6 rounded-2xl font-semibold"
              >
                Send
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-6">Automation Engine</h2>

            <div className="space-y-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Instagram Auto Reply</p>
                  <span className="text-green-400">Running</span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Facebook Lead Capture</p>
                  <span className="text-green-400">Active</span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">CRM Sync</p>
                  <span className="text-yellow-400">Processing</span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">AI Sales Funnel</p>
                  <span className="text-green-400">Optimizing</span>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-black rounded-2xl p-5 border border-zinc-800">
              <p className="text-zinc-400 mb-2">System Status</p>
              <h3 className="text-3xl font-bold text-green-400">
                {autopilot ? "ONLINE" : "OFFLINE"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
