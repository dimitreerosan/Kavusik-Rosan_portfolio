import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { Vector3 } from 'three'

import stlUrl from '../clawd_large.stl?url'

function STLModel() {
  const floatRef = useRef()
  const geometry = useLoader(STLLoader, stlUrl)

  geometry.computeBoundingBox()
  const box = geometry.boundingBox
  const center = new Vector3()
  box.getCenter(center)
  geometry.translate(-center.x, -center.y, -center.z)

  const size = new Vector3()
  box.getSize(size)
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = 0.7 / maxDim

  useFrame(({ clock }) => {
    if (!floatRef.current) return
    const t = clock.getElapsedTime()

    floatRef.current.rotation.y = t * 1.4
    floatRef.current.rotation.z = Math.sin(t * 0.9) * 0.18

    const jumpY = Math.abs(Math.sin(t * 0.75)) * 0.5
    const floatY = Math.sin(t * 0.42) * 0.1

    floatRef.current.position.y = jumpY + floatY + 0.3
  })

  return (
    <group ref={floatRef} scale={scale}>
      <mesh rotation={[Math.PI / 2, Math.PI, 1.2]}>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial
          color="#CC785C"
          roughness={0.55}
          metalness={0.0}
        />
      </mesh>
    </group>
  )
}

export default function ModelViewer() {
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
    []
  )

  if (prefersReducedMotion) {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        aria-hidden
      />
    )
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 6, 4]} intensity={2.2} />
        <directionalLight position={[-3, 2, 3]} intensity={0.6} color="#ffddcc" />

        <Suspense fallback={null}>
          <STLModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
