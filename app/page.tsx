"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const TextCanvas = dynamic(() => import("./TextCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-slate-100 flex items-center justify-center rounded-xl animate-pulse">
      <p className="text-slate-400 font-medium">Loading 3D Engine...</p>
    </div>
  ),
});

export default function Home() {
  const [inputText, setInputText] = useState("Hello");

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            3D Chrome Generator
          </h1>
          <p className="text-slate-500 mt-1">
            Type below to render real-time inflated chrome text
          </p>
        </header>

        <TextCanvas text={inputText} />

        <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Your Text
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={15}
            placeholder="Type something..."
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
          />
        </div>
      </div>
    </main>
  );
}