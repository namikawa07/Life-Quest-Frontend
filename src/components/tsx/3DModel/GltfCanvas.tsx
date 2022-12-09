import { FC, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRMLoaderPlugin } from '@pixiv/three-vrm'

import useWindowSize from './useWindowSize'

const Model: FC = () => {
  const [gltf, setGltf] = useState<GLTF>()
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (!gltf) {
      const loader = new GLTFLoader()
      loader.register((parser) => {
        return new VRMLoaderPlugin(parser)
      })

      loader.load(
        '/assets/model/model.vrm',
        (tmpGltf) => {
          setGltf(tmpGltf)
          console.log('loaded')
        },
        // called as loading progresses
        (xhr) => {
          setProgress((xhr.loaded / xhr.total) * 100)
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        // called when loading has errors
        (error) => {
          console.log('An error happened')
          console.log(error)
        }
      )
    }
  }, [])

  return (
    <>
      {gltf ? (
        <primitive object={gltf.scene} />
      ) : (
        <Html center>{progress} % loaded</Html>
      )}
    </>
  )
}

const GltfCanvas: FC = () => {
  const gltfCanvasParentRef = useRef<HTMLDivElement>(null)

  const windowSize = useWindowSize()

  return (
    <div ref={gltfCanvasParentRef} style={{ height: `calc(100vh - 48px)` }}>
      <Canvas
        frameloop="demand"
        camera={{ fov: 20, near: 0.1, far: 300, position: [0, 1, -10] }}
        flat
      >
        <directionalLight position={[1, 1, -1]} color={'0xFFFFFF'} />
        <Model />
        {/* <color attach="background" args={['#f7f7f7']} />*/}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={false}
        />
        <gridHelper />
      </Canvas>
    </div>
  )
}

export default GltfCanvas
