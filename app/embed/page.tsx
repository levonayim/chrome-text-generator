"use client";

import { useSearchParams } from "next/navigation";
import TextCanvas from "../TextCanvas";

type BgType = "gradient" | "solid" | "transparent";

export default function EmbedPage() {
  const searchParams = useSearchParams();
  
  const text = searchParams.get("text") || "CHROME";
  
  // Cast the URL query parameter to the expected type with a fallback
  const rawBgType = searchParams.get("bgType");
  const bgType: BgType = (rawBgType === "solid" || rawBgType === "transparent" || rawBgType === "gradient") 
    ? rawBgType 
    : "gradient";

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