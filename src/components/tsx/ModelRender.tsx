import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'
import styles from './ModelRender.module.scss'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// TODO: typescriptのany直す
export default function ModelRender(props: any) {
  // state
  const [isLoaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [vrmData, setVrm] = useState(null)

  // props
  const { animation, characterName, boneSize } = props

  // globalData
  const characterPath = `/models/boneSize/${boneSize}/characters/${characterName}.vrm`
  const animatioinPath = `/models/boneSize/${boneSize}/animations/jump.csv`

  // シーンの準備
  const scene = new THREE.Scene()

  useEffect(() => {
    const camera = settingCamera()
    init(camera)
  }, [])

  function settingCamera() {
    return new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  }

  function init(camera: any) {
    // レンダラーの準備
    const canvas: any = document.querySelector('#canvas')
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x7fbfff, 0)

    // ライトの準備
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(-1, 1, -1).normalize()
    scene.add(light)

    // アニメーションの準備
    let mixer: any = null

    // vrmをロードしてそれをgltfとする
    // VRMの読み込み

    const vrmLoader = new GLTFLoader()
    vrmLoader.load(
      characterPath,
      (gltf) => {
        VRM.from(gltf).then((vrm: any) => {
          // 姿勢の指定
          vrm.scene.position.y = -1
          vrm.scene.position.z = -3
          vrm.scene.rotation.y = Math.PI
          setVrm(vrm)

          // シーンへの追加
          scene.add(vrm.scene)

          // animationの設定
          setupAnimation(vrm)
          console.log(`******vrmData ${vrmData}`)
        })
      },
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

    const setupAnimation = (vrm: any) => {
      // ボーンリストの生成
      const bonesArray = http2str('/models/bone.txt').split('\n')
      const bones: any = []
      bonesArray.forEach((boneName: any) => {
        if (vrm.humanoid.getBoneNode(boneName) !== null)
          bones.push(vrm.humanoid.getBoneNode(boneName))
      })

      console.log(
        `========== hierarchyTracks.length ${
          csv2hierarchy(http2str(animatioinPath), 200).length
        }`
      ) // ここのbone数によってAnimationExporterの繰り返し処理数を変える。各対応するbone数も変える

      // AnimationClipの生成
      const clip = THREE.AnimationClip.parseAnimation(
        {
          hierarchy: csv2hierarchy(http2str(animatioinPath), 200),
        },
        bones
      )

      // トラック名の変更
      clip.tracks.some((track) => {
        track.name = track.name.replace(
          /^\.bones\[([^\]]+)\].(position|quaternion|scale)$/,
          '$1.$2'
        )
      })

      // AnimationMixerの生成と再生
      mixer = new THREE.AnimationMixer(vrm.scene)

      // AnimationActionの生成とアニメーションの再生
      const action = mixer.clipAction(clip)
      action.play()
    }

    // http → str
    const http2str: any = (url: any) => {
      try {
        const request = new XMLHttpRequest()
        request.open('GET', url, false)
        request.send(null)
        if (request.status == 200 || request.status == 0) {
          return request.responseText.trim()
        }
      } catch (e) {
        console.log(e)
      }
      return null
    }

    // CSV → hierarchy
    const csv2hierarchy = (csv: any, fps: any) => {
      // 文字列 → 配列
      const lines = csv.trim().split('\n')
      const data: any = []
      for (let j = 0; j < lines.length; j++) {
        data[j] = []
        const strs = lines[j].split(',')
        for (let i = 0; i < boneSize * 4; i++) {
          data[j][i] = Number(strs[i])
        }
      }

      // 配列 → hierarchy
      const hierarchy = []
      for (let i = 0; i < boneSize; i++) {
        const keys = []
        for (let j = 0; j < data.length; j++) {
          keys[j] = {
            rot: new THREE.Quaternion(
              -data[j][i * 4],
              -data[j][i * 4 + 1],
              data[j][i * 4 + 2],
              data[j][i * 4 + 3]
            ).toArray(),
            time: fps * j,
          }
        }
        hierarchy[i] = { keys: keys }
      }
      return hierarchy
    }

    // アニメーションループの開始
    let lastTime = new Date().getTime()
    function animate() {
      console.log(`******animate`)
      requestAnimationFrame(animate)

      // AnimationMixerの更新
      const time = new Date().getTime()
      if (mixer) mixer.update(time - lastTime)
      lastTime = time

      render(renderer, scene, camera)
    }
    animate()
    console.log(`******vrmData ${vrmData}`)
  }

  function render(renderer: any, scene: any, camera: any) {
    renderer.render(scene, camera)
  }

  return (
    <>
      <canvas id="canvas" className={styles.canvas}></canvas>
    </>
  )
}
