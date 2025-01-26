import { Environment, OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useAtom } from "jotai"
import { Book } from "./Book"
import { pageAtom } from "./UI"

export const Experience = () => {
  const BOOK_SIZE = 0.85
  const [page] = useAtom(pageAtom)

  useFrame((state) => {

    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
    state.camera.lookAt(0, 0.5, 0)
  })

  return (
    <>
      {/* <group position-y={0.5}> */}
        <Book scale={BOOK_SIZE} />
      {/* </group> */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
    enableRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
      <Environment preset="studio" intensity={1} />
      {/* <ambientLight intensity={0.5} /> */}
      {/* <directionalLight
        position={[2, 5, 2]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      /> */}
      {/* <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh> */}
    </>
  )
}