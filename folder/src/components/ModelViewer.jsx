import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import * as THREE from 'three'

import stlUrl from '../clawd_large.stl?url'

function STLModel() {
  const floatRef = useRef()
  const geometry = useLoader(STLLoader, stlUrl)

  geometry.computeBoundingBox()
  const box = geometry.boundingBox
  const center = new THREE.Vector3()
  box.getCenter(center)
  geometry.translate(-center.x, -center.y, -center.z)

  const size = new THREE.Vector3()
  box.getSize(size)
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = 2.0 / maxDim

  useFrame(({ clock }) => {
    if (!floatRef.current) return
    const t = clock.getElapsedTime()

    // Full 360° continuous spin on Y (slow — one full turn every ~8s)
    floatRef.current.rotation.y = t * 1.4

    // Twist tilt on Z — gentle side-to-side lean while spinning
    floatRef.current.rotation.z = Math.sin(t * 0.9) * 0.18

    // Jump: smooth bounce arc (abs sine — lands and leaps)
    const jumpY = Math.abs(Math.sin(t * 0.75)) * 0.85

    // Float: slow gentle drift layered on jump
    const floatY = Math.sin(t * 0.42) * 0.1

    floatRef.current.position.y = jumpY + floatY
  })

  return (
    <group ref={floatRef} scale={scale}>
      {/* 
        Target orientation from image:
        - Body upright: X = +PI/2 (fix Z-up STL to Y-up scene)
        - Slight forward tilt showing depth: extra X = -0.35 rad (~-20°)
        - Face front: Y = PI (flip to face camera)
      */}
      <mesh rotation={[Math.PI / 2, Math.PI, 1.2]} castShadow>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial
          color="#CC785C"
          roughness={0.55}
          metalness={0.0}
          envMapIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

export default function ModelViewer() {
  return (
    <div style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 6, 4]} intensity={2.2} castShadow />
        <directionalLight position={[-3, 2, 3]} intensity={0.6} color="#ffddcc" />
        <directionalLight position={[0, -2, 2]} intensity={0.3} color="#331a0a" />
        <pointLight position={[2, 3, 5]} intensity={1.0} color="#ffccaa" />

        <Suspense fallback={null}>
          <STLModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
