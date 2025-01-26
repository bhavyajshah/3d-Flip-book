import { Loader } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Experience } from "./components/Experience"
import { UI } from "./components/UI"

function App() {
  return (
    <>
      <div className="fixed inset-0 z-0">
        <Canvas
          // shadows
          camera={{
            position: [0, 1.5, 4.5],
            fov: 45,
            aspect: window.innerWidth / window.innerHeight,
          }}
        >
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>
      <div className="fixed inset-0 z-10 pointer-events-none">
        <UI />
      </div>
      <Loader />
    </>
  )
}

export default App
