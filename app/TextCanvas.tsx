"use client";

import { Canvas } from "@react-three/fiber";
import { Text3D, Center, Environment, OrbitControls } from "@react-three/drei";

interface TextCanvasProps {
  text: string;
}

export default function TextCanvas({ text }: TextCanvasProps) {
  const baseSize = 0.8;
  const dynamicSize = text.length > 5 ? baseSize * (5 / text.length) : baseSize;

  return (
    <div className="w-full h-[500px] bg-gradient-to-b from-sky-200 to-sky-400 rounded-xl overflow-hidden shadow-inner cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
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
          touches={{
            ONE: 0, // One finger does nothing, preventing accidental shifts while scrolling the web page
            TWO: 1  // Two fingers will smoothly rotate and pinch-zoom the 3D chrome text
          }}
          makeDefault 
        />
      </Canvas>
    </div>
  );
}