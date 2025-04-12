import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

const MatrixText = ({ position, text, color = '#00ff00' }) => {
  const textRef = useRef()
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={position}
        fontSize={0.5}
        color={color}
        font="/fonts/ShareTechMono-Regular.ttf"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  )
}

const Terminal = () => {
  const terminalRef = useRef()
  const geometry = useMemo(() => new THREE.PlaneGeometry(4, 2), [])
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(800, 600) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv;
            float grid = 0.05;
            vec2 gridUv = mod(uv, grid);
            float line = step(0.01, gridUv.x) * step(0.01, gridUv.y);
            float glow = sin(uv.y * 10.0 + time) * 0.5 + 0.5;
            vec3 color = vec3(0.0, 1.0, 0.0) * line * glow * 0.7;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        transparent: true,
      }),
    []
  )

  useFrame((state) => {
    if (terminalRef.current) {
      terminalRef.current.material.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={terminalRef} geometry={geometry} material={material} position={[0, 0, -2]} />
  )
}

const Scene = () => {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#00ff00" />
      <Terminal />
      <MatrixText position={[-2, 1, 0]} text="> ACCESS GRANTED" color="#00ff00" />
      <MatrixText position={[-2, 0, 0]} text="> INITIALIZING SYSTEM" color="#00ff00" />
      <MatrixText position={[-2, -1, 0]} text="> LOADING DATA..." color="#00ff00" />
    </group>
  )
}

export default Scene 