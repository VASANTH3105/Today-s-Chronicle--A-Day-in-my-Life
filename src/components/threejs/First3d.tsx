import React, { useState, useEffect, useRef } from 'react'; // 1. Import useState and useEffect
import { ViewStyle } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { Mesh } from 'three';
import * as THREE from 'three';
import { DeviceMotion } from 'expo-sensors'; // 2. Import the DeviceMotion object

import ThemedText from '../themed/ThemedText';

// The Cube component does not need to change.
const Cube = ({ rotationData }: { rotationData: any }) => {
  const meshRef = useRef<Mesh>(null!);
  useFrame(() => {
    if (!meshRef.current || !rotationData) {
      return;
    }
    const { beta, gamma } = rotationData;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x, -beta, 0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, -gamma, 0.1
    );
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#5C85FF" roughness={0.1} metalness={0.6} />
    </mesh>
  );
};

const First3d = ({ style }: { style?: ViewStyle }) => {
  // 3. Create state to hold the motion data
  const [motionData, setMotionData] = useState<any>(null);

  // 4. Use useEffect to subscribe and unsubscribe to the sensor
  useEffect(() => {
    // Set how often to receive updates (optional)
    DeviceMotion.setUpdateInterval(16); // ~60fps

    // Start listening for updates
    const subscription = DeviceMotion.addListener((listenerData) => {
      setMotionData(listenerData.rotation);
    });

    // Cleanup function: remove the listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []); // The empty array ensures this runs only once

  // We can't check for availability directly here, but can check if we have data
  if (!motionData) {
    return <ThemedText>Waiting for gyroscope data...</ThemedText>;
  }

  return (
    <Canvas style={style}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 2, 0]} intensity={2} />
      <Cube rotationData={motionData} />
    </Canvas>
  );
};

export default First3d;