import type { NextPage } from 'next'
import MainLayout from '../layouts'
import Image from 'next/image'
import styles from './index.module.scss'
import ModelRender from '~/components/tsx/ModelRender.js'

const RouteIndex: NextPage = () => {
  return (
    <MainLayout>
      <ModelRender />
      <div className={styles.background}>
        <Image src="/image.jpg" alt="logo" layout="fill" objectFit="cover" />
      </div>
    </MainLayout>
  )
}

export default RouteIndex
