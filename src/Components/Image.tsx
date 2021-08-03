import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils";
import "./ShaderMaterial";

interface ImageProps {
  url1: string;
  url2: string;
  disp: string;
}

export const Image: React.FC<ImageProps> = ({ url1, url2, disp, ...props }) => {
  const ref = useRef(null);
  const [hovered, setHover] = useState(false);
  const [texture1, texture2, disptexture] = useLoader(THREE.TextureLoader, [
    url1,
    url2,
    disp,
  ]);
  useFrame(() => {
    if (ref.current) {
      /**
       * When user hovers over the element, linearly interpolate between dispFactor (default = 0) to 1, with 0.1
       */
      (ref.current as any).material.dispFactor = lerp(
        (ref.current as any).material.dispFactor,
        hovered ? 1 : 0,
        0.1
      );
    }
  });
  return (
    <mesh
      ref={ref}
      {...props}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry attach="material" args={[5, 5]} />
      {/* @ts-ignore */}
      <fade
        attach="material"
        utexture={texture1}
        utexture2={texture2}
        disp={disptexture}
      />
    </mesh>
  );
};
