import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader'
import { VRM, VRMSchema } from '@pixiv/three-vrm'

export default function ModelRender() {
  const [isLoaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
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
    renderer.setClearColor(0x7fbfff, 0)
    document.body.appendChild(renderer.domElement)

    // ライトの準備
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(-1, 1, -1).normalize()
    scene.add(light)

    // アニメーションの準備
    let mixer = null

    // alicia.vrmをロードしてそれをgltfとする
    // VRMの読み込み
    const loader = new GLTFLoader()
    loader.load(
      '/alicia.vrm',
      (gltf) => {
        VRM.from(gltf).then((vrm) => {
          // 姿勢の指定
          vrm.scene.position.y = -1
          vrm.scene.position.z = -3
          vrm.scene.rotation.y = Math.PI

          // シーンへの追加
          scene.add(vrm.scene)

          // animationの設定
          setupAnimation(vrm)
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

    const setupAnimation = (vrm) => {
      // ボーンリストの生成
      const bones = http2str('/bone.txt')
        .split('\n')
        .map((boneName) => {
          return vrm.humanoid.getBoneNode(boneName)
        })

      // AnimationClipの生成
      const clip = THREE.AnimationClip.parseAnimation(
        {
          hierarchy: csv2hierarchy(http2str('/anim.csv'), 200),
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
    const http2str = (url) => {
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
    const csv2hierarchy = (csv, fps) => {
      // 文字列 → 配列
      const lines = csv.trim().split('\n')
      const data = []
      for (let j = 0; j < lines.length; j++) {
        data[j] = []
        const strs = lines[j].split(',')
        for (let i = 0; i < 55 * 4; i++) {
          data[j][i] = Number(strs[i])
        }
      }

      // 配列 → hierarchy
      const hierarchy = []
      for (let i = 0; i < 55; i++) {
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
      requestAnimationFrame(animate)

      // AnimationMixerの更新
      const time = new Date().getTime()
      if (mixer) mixer.update(time - lastTime)
      lastTime = time

      renderer.render(scene, camera)
    }
    animate()
  }, [])

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  )

  // トラックの取得
  function findTrack(name, tracks) {
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].name == name) return tracks[i]
    }
    return null
  }

  // 配列をQuaternionに変換
  function values2quaternion(values, i) {
    return new THREE.Quaternion(
      values[i * 4],
      values[i * 4 + 1],
      values[i * 4 + 2],
      values[i * 4 + 3]
    )
  }

  // キーリストの生成
  function createKeys(id, tracks) {
    const posTrack = findTrack('.bones[' + id + '].position', tracks)
    const rotTrack = findTrack('.bones[' + id + '].quaternion', tracks)

    const keys = []
    const rate = 0.008 // サイズの調整
    for (let i = 0; i < posTrack.times.length; i++) {
      const key = {}

      // 時間
      key['time'] = parseInt(posTrack.times[i] * 1000)

      // 回転
      if (id == 'rButtock' || id == 'lButtock') {
        const id2 = id == 'rButtock' ? 'rThigh' : 'lThigh'
        const q1 = values2quaternion(rotTrack.values, i)
        const rotTrack2 = findTrack('.bones[' + id2 + '].quaternion', tracks)
        q1.multiply(values2quaternion(rotTrack2.values, i))
        key['rot'] = [-q1.x, q1.y, -q1.z, q1.w]
      } else {
        key['rot'] = [
          -rotTrack.values[i * 4],
          rotTrack.values[i * 4 + 1],
          -rotTrack.values[i * 4 + 2],
          rotTrack.values[i * 4 + 3],
        ]
      }

      // 位置
      if (id == 'hip') {
        key['pos'] = [
          -posTrack.values[i * 3] * rate,
          posTrack.values[i * 3 + 1] * rate,
          -posTrack.values[i * 3 + 2] * rate,
        ]
      }
      keys.push(key)
    }
    if (keys.length == 0) return null
    return keys
  }

  // クリップの生成
  function createClip(vrm, bvh) {
    // ボーンリストの生成
    const nameList = [
      VRMSchema.HumanoidBoneName.Head,
      VRMSchema.HumanoidBoneName.Neck,
      VRMSchema.HumanoidBoneName.Chest,
      VRMSchema.HumanoidBoneName.Spine,
      VRMSchema.HumanoidBoneName.Hips,
      VRMSchema.HumanoidBoneName.RightShoulder,
      VRMSchema.HumanoidBoneName.RightUpperArm,
      VRMSchema.HumanoidBoneName.RightLowerArm,
      VRMSchema.HumanoidBoneName.RightHand,
      VRMSchema.HumanoidBoneName.LeftShoulder,
      VRMSchema.HumanoidBoneName.LeftUpperArm,
      VRMSchema.HumanoidBoneName.LeftLowerArm,
      VRMSchema.HumanoidBoneName.LeftHand,
      VRMSchema.HumanoidBoneName.RightUpperLeg,
      VRMSchema.HumanoidBoneName.RightLowerLeg,
      VRMSchema.HumanoidBoneName.RightFoot,
      VRMSchema.HumanoidBoneName.LeftUpperLeg,
      VRMSchema.HumanoidBoneName.LeftLowerLeg,
      VRMSchema.HumanoidBoneName.LeftFoot,
    ]
    const idList = [
      'head',
      'neck',
      'chest',
      'abdomen',
      'hip',
      'rCollar',
      'rShldr',
      'rForeArm',
      'rHand',
      'lCollar',
      'lShldr',
      'lForeArm',
      'lHand',
      'rButtock',
      'rShin',
      'rFoot',
      'lButtock',
      'lShin',
      'lFoot',
    ]
    const bones = nameList.map((boneName) => {
      return vrm.humanoid.getBoneNode(boneName)
    })

    // AnimationClipの生成
    const hierarchy = []
    for (let i = 0; i < idList.length; i++) {
      const keys = createKeys(idList[i], bvh.clip.tracks)
      if (keys != null) {
        hierarchy.push({ keys: keys })
      }
    }
    const clip = THREE.AnimationClip.parseAnimation(
      { hierarchy: hierarchy },
      bones
    )

    // トラック名の変更
    clip.tracks.some((track) => {
      track.name = track.name.replace(
        /^\.bones\[([^\]]+)\].(position|quaternion|scale)$/,
        '$1.$2'
      )
    })
    return clip
  }
}
