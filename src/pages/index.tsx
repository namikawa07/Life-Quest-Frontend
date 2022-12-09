import type { NextPage } from 'next'
import MainLayout from '../layouts'
import Image from 'next/image'
import styles from './index.module.scss'
// import Test from '../components/tsx/3DModel/Test'
// import { YBot } from '../components/tsx/webGL/character/model/YBot'
import ModelRender from '../components/tsx/Test'

const RouteIndex: NextPage = () => {
  return (
    <MainLayout>
      {/*<YBot />*/}
      {/*<Test />*/}
      <ModelRender />
      <div className={styles.background}>
        <Image src="/image.jpg" alt="logo" layout="fill" objectFit="cover" />
      </div>
    </MainLayout>
  )
}

export default RouteIndex
