"use client";

import { useSearchParams } from "next/navigation";
import TextCanvas from "../TextCanvas";

export default function EmbedPage() {
  const searchParams = useSearchParams();
  
  const text = searchParams.get("text") || "CHROME";
  const bgType = searchParams.get("bgType") || "gradient"; // "gradient", "solid", "transparent"
  const bgColor = searchParams.get("bgColor") || "#000000";

  return (
    <div className="w-screen h-screen overflow-hidden bg-transparent">
      <TextCanvas 
        text={text} 
        bgType={bgType}
        bgColor={bgColor}
      />
    </div>
  );
}