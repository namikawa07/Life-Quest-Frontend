import React, { VFC } from 'react'
import { Canvas } from '@react-three/fiber'

type Props = {
  children: React.ReactNode
  fov?: number
  position?: [number, number, number]
  width?: string
  height?: string
}

// fov: どのくらい寄って写すかを制御する。数字が小さくなるほと被写体はズームして表示される
// position: カメラ画角の制御
export const TCanvas: VFC<Props> = (props) => {
  const {
    children,
    fov = 50,
    position = [0, 3, 10],
    width = '100vw',
    height = '100vh',
  } = props
  return (
    <div style={{ width: width, height: height }}>
      <Canvas camera={{ fov, position }} dpr={[1, 2]} shadows>
        {children}
      </Canvas>
    </div>
  )
}
