"use client";

import { Canvas } from "@react-three/fiber";
import { Text3D, Center, Environment, OrbitControls } from "@react-three/drei";

interface TextCanvasProps {
  text: string;
  transparentBg?: boolean;
}

export default function TextCanvas({ text, transparentBg = false }: TextCanvasProps) {
  const baseSize = 0.8;
  const dynamicSize = text.length > 5 ? baseSize * (5 / text.length) : baseSize;

  return (
    <div
      /* Added 'touch-none' here so mobile Safari/Chrome doesn't hijack your finger drags */
      className={`w-full h-[500px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing touch-none ${
        transparentBg 
          ? "bg-transparent" 
          : "bg-gradient-to-b from-sky-200 to-sky-400 shadow-inner"
      }`}
    >
      <Canvas 
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          if (transparentBg) {
            gl.setClearColor(0x000000, 0);
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

        {/* Updated OrbitControls mapping */}
        <OrbitControls
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
          panSpeed={1.2}
          rotateSpeed={0.8}
          zoomSpeed={1.0}
          mouseButtons={{
            LEFT: 2,   // 1-finger trackpad drag = PAN (Moves word across screen)
            RIGHT: 0,  // 2-finger trackpad click / Right-click = ROTATE
          }}
          touches={{
            ONE: 2,    // 1-finger touch on mobile = PAN (Moves word across screen)
            TWO: 0,    // 2-finger touch on mobile = ROTATE & PINCH-ZOOM
          }}
          makeDefault
        />
      </Canvas>
    </div>
  );
}