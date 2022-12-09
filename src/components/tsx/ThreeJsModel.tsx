import type { NextPage } from 'next'
import { useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'

const ThreeJsModel: NextPage = () => {
  let canvas: HTMLElement
  useEffect(() => {
    if (canvas) return
    // canvasを取得
    canvas = document.getElementById('canvas')!

    // シーンの準備
    const scene = new THREE.Scene()

    // カメラの準備
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    // レンダラーの準備
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x7fbfff, 1.0)
    document.body.appendChild(renderer.domElement)

    // ライトの準備
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(-1, 1, -1).normalize()
    scene.add(light)

    // VRMの読み込み
    const loader = new GLTFLoader()
    loader.load('./alicia.vrm', (gltf) => {
      VRM.from(gltf).then((vrm: any) => {
        // 姿勢の指定
        vrm.scene.position.y = -1
        vrm.scene.position.z = -3
        vrm.scene.rotation.y = Math.PI

        // シーンへの追加
        scene.add(vrm.scene)
      })
    })

    // アニメーションループの開始
    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }, [])
  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  )
}

export default ThreeJsModel
