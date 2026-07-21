"use client";

import { Canvas } from "@react-three/fiber";
import { Text3D, Center, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface TextCanvasProps {
  text: string;
  bgType?: "gradient" | "solid" | "transparent";
  bgColor?: string;
}

export default function TextCanvas({ 
  text, 
  bgType = "gradient", 
  bgColor = "#000000" 
}: TextCanvasProps) {
  const baseSize = 0.8;
  const dynamicSize = text.length > 5 ? baseSize * (5 / text.length) : baseSize;

  const isTransparent = bgType === "transparent";

  // Determine container background styling
  let containerBgClass = "";
  let containerStyle: React.CSSProperties = { touchAction: "none" };

  if (bgType === "gradient") {
    containerBgClass = "bg-gradient-to-b from-sky-200 to-sky-400 shadow-inner";
  } else if (bgType === "solid") {
    containerStyle.backgroundColor = bgColor;
  } else {
    containerStyle.backgroundColor = "transparent";
  }

  return (
    <div
      className={`w-full h-[500px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none ${containerBgClass}`}
      style={containerStyle}
    >
      <Canvas 
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          if (isTransparent) {
            gl.setClearColor(0x000000, 0); // 0 opacity for WebGL canvas
          }
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ touchAction: "none" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <Center>
          <Text3D
            font="/fonts/bold_font.json"
            size={dynamicSize}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.15}
            bevelSize={0.06}
            bevelOffset={0}
            bevelSegments={15}
          >
            {text || "Hello"}
            <meshPhysicalMaterial
              metalness={1.0}
              roughness={0.05}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              color="#ffffff"
            />
          </Text3D>
        </Center>

        <Environment preset="studio" />

        <OrbitControls
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
          panSpeed={1.5}
          rotateSpeed={0.8}
          zoomSpeed={1.0}
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            RIGHT: THREE.MOUSE.ROTATE,
          }}
          touches={{
            ONE: THREE.TOUCH.PAN,
            TWO: THREE.TOUCH.DOLLY_ROTATE,
          }}
          makeDefault
        />
      </Canvas>
    </div>
  );
}