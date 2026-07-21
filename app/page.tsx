"use client";

import { useState } from "react";
import TextCanvas from "./TextCanvas";

export default function Home() {
  const [text, setText] = useState("CHROME");
  const [bgType, setBgType] = useState<"gradient" | "solid" | "transparent">("gradient");
  const [bgColor, setBgColor] = useState("#000000");
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate the dynamic iframe URL based on live user inputs
  const domain = typeof window !== "undefined" ? window.location.origin : "https://chrome-text-generator.vercel.app";
  const embedUrl = `${domain}/embed?text=${encodeURIComponent(text)}&bgType=${bgType}&bgColor=${encodeURIComponent(bgColor)}`;

  const iframeSnippet = `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="500" 
  frameborder="0" 
  scrolling="no"
  allowtransparency="true"
  style="border:none; overflow:hidden; background:transparent;">
</iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iframeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">3D Chrome Text Generator</h1>

      {/* 3D Canvas Preview */}
      <TextCanvas text={text} bgType={bgType} bgColor={bgColor} />

      {/* Controls Section */}
      <div className="bg-slate-100 p-6 rounded-xl flex flex-col gap-4">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Text Input</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 rounded border"
            placeholder="Type your word..."
          />
        </div>

        {/* Background Selector */}
        <div>
          <label className="block text-sm font-semibold mb-2">Background Style</label>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setBgType("gradient")}
              className={`px-4 py-2 rounded ${bgType === "gradient" ? "bg-black text-white" : "bg-white border"}`}
            >
              Gradient (Default)
            </button>
            <button
              onClick={() => setBgType("transparent")}
              className={`px-4 py-2 rounded ${bgType === "transparent" ? "bg-black text-white" : "bg-white border"}`}
            >
              Transparent (No BG)
            </button>
            <button
              onClick={() => setBgType("solid")}
              className={`px-4 py-2 rounded ${bgType === "solid" ? "bg-black text-white" : "bg-white border"}`}
            >
              Custom Solid Color
            </button>

            {bgType === "solid" && (
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 cursor-pointer rounded border"
              />
            )}
          </div>
        </div>

        {/* Embed Code Button */}
        <button
          onClick={() => setShowEmbedModal(true)}
          className="mt-2 w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Export & Get Embed Code
        </button>
      </div>

      {/* Embed Code Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full flex flex-col gap-4 shadow-2xl">
            <h2 className="text-xl font-bold">Embed Your 3D Chrome Text</h2>
            <p className="text-sm text-gray-600">
              Paste this snippet into Webflow, Framer, WordPress, or any HTML file:
            </p>

            <textarea
              readOnly
              rows={6}
              value={iframeSnippet}
              className="w-full font-mono text-xs p-3 bg-slate-900 text-green-400 rounded-lg"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEmbedModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-black text-white rounded font-medium hover:bg-gray-800"
              >
                {copied ? "Copied! ✓" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}