"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TextCanvas from "../TextCanvas";

type BgType = "gradient" | "solid" | "transparent";

// 1. Child component that reads the URL params
function EmbedContent() {
  const searchParams = useSearchParams();
  
  const text = searchParams.get("text") || "CHROME";
  
  const rawBgType = searchParams.get("bgType");
  const bgType: BgType = (rawBgType === "solid" || rawBgType === "transparent" || rawBgType === "gradient") 
    ? rawBgType 
    : "gradient";

  const bgColor = searchParams.get("bgColor") || "#000000";

  return (
    <TextCanvas 
      text={text} 
      bgType={bgType}
      bgColor={bgColor}
    />
  );
}

// 2. Main page wrapped in React Suspense
export default function EmbedPage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-transparent">
      <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
        <EmbedContent />
      </Suspense>
    </div>
  );
}