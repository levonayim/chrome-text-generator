"use client";

import { Canvas } from "@react-three/fiber";
import { Text3D, Center, Environment, OrbitControls } from "@react-three/drei";

interface TextCanvasProps {
  text: string;
  transparentBg?: boolean; // 1. Added optional prop (defaults to false)
}

export default function TextCanvas({ text, transparentBg = false }: TextCanvasProps) {
  const baseSize = 0.8;
  const dynamicSize = text.length > 5 ? baseSize * (5 / text.length) : baseSize;

  return (
    <div
      className={`w-full h-[500px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing ${
        // 2. Conditionally toggle background color/gradient
        transparentBg 
          ? "bg-transparent" 
          : "bg-gradient-to-b from-sky-200 to-sky-400 shadow-inner"
      }`}
    >
      <Canvas 
        // 3. Enable WebGL alpha transparency channel
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          if (transparentBg) {
            gl.setClearColor(0x000000, 0); // 0 = 100% transparent
          }
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
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
          panSpeed={1.2}
          rotateSpeed={0.8}
          mouseButtons={{
            LEFT: 2,   // 1-finger trackpad drag = PAN (moves the word around)
            RIGHT: 0,  // 2-finger click / Right-click = ROTATE
          }}
          touches={{
            ONE: 2,    // 1-finger touch on mobile/screen = PAN
            TWO: 1,    // 2-finger touch = ROTATE & ZOOM
          }}
          makeDefault
        />
      </Canvas>
    </div>
  );
}