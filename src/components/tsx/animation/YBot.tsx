import React, { Suspense, VFC } from 'react'
import { css } from '@emotion/css'
import { OrbitControls } from '@react-three/drei'
import { TDirectionalLight } from '../threeJs/TDirectionalLight'
import { TFloorPlane } from '../threeJs/TFloorPlane'
import { TCanvas } from '../threeJs/TCanvas'
import { Controller } from './Controller'
import { Model } from './Model'

export const YBot: VFC = () => {
  return (
    <div className={styles.container}>
      <TCanvas>
        {/* control */}
        <OrbitControls />
        {/* light */}
        <TDirectionalLight position={[5, 5, 5]} />
        {/* model */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        {/* objects */}
        <TFloorPlane />
      </TCanvas>

      <div className={styles.controller}>
        <Controller />
      </div>
    </div>
  )
}

const styles = {
  container: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  controller: css`
    position: absolute;
    top: 20px;
    left: 20px;
  `,
}
