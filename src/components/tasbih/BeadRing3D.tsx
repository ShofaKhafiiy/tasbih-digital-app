"use no memo";
/* eslint-disable react/no-unknown-property */

import { Canvas, useFrame } from "@react-three/fiber/native";
import { useFocusEffect } from "expo-router";
import type { ReactNode } from "react";
import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Platform, StyleSheet, View } from "react-native";
import * as THREE from "three";

import { useTheme } from "@/context/ThemeContext";

interface BeadRing3DProps {
  size: number;
  enabled?: boolean;
}

function BeadsField({ gold, pearl }: { gold: string; pearl: string }) {
  const group = useRef<THREE.Group>(null);
  const goldColor = useMemo(() => new THREE.Color(gold), [gold]);
  const pearlColor = useMemo(() => new THREE.Color(pearl), [pearl]);

  const beads = useMemo(() => {
    return Array.from({ length: 33 }, (_, index) => {
      const angle = (index / 33) * Math.PI * 2;
      return {
        index,
        position: [Math.cos(angle) * 1.45, Math.sin(angle) * 1.45, 0] as [
          number,
          number,
          number,
        ],
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.08;
    group.current.rotation.x =
      0.18 + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.18, 0, 0]}>
      {beads.map(({ index, position }) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[index === 0 ? 0.1 : 0.072, 18, 18]} />
          <meshStandardMaterial
            color={index === 0 || index % 11 === 0 ? goldColor : pearlColor}
            metalness={0.72}
            roughness={0.32}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ gold, pearl }: { gold: string; pearl: string }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <pointLight position={[-3, -2, 2]} intensity={2} color={gold} />
      <BeadsField gold={gold} pearl={pearl} />
    </>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function BeadRing3D({ size, enabled = true }: BeadRing3DProps) {
  const { colors } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) setMounted(true);
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [enabled]);

  if (!enabled || !mounted || Platform.OS === "web") return null;

  return (
    <View
      style={[
        styles.layer,
        { width: size, height: size, pointerEvents: "none" },
      ]}
    >
      <SceneBoundary>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 4.6], fov: 42 }}
            frameloop={focused ? "always" : "never"}
            gl={{ alpha: true, antialias: true }}
            style={styles.canvas}
          >
            <Scene gold={colors.accent} pearl={colors.sage} />
          </Canvas>
        </Suspense>
      </SceneBoundary>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    position: "absolute",
    opacity: 0.42,
  },
  canvas: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
