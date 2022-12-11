import type { NextPage } from 'next'
import { useState } from 'react'
import MainLayout from '../layouts'
import Image from 'next/image'
import styles from './index.module.scss'
import ModelRender from '~/components/tsx/ModelRender'

const RouteIndex: NextPage = () => {
  const [currentAction, setAction] = useState<string>('')

  const clickAction = (action: string) => {
    console.log(`*********clickAction`)
    setAction(action)
  }

  return (
    <MainLayout>
      <main className={styles.main}>
        <button onClick={() => clickAction('jump')}>Jump</button>
      </main>
      <div className={styles.render}>
        <ModelRender animation={currentAction} />
      </div>
      <div className={styles.background}>
        <Image src="/image.jpg" alt="logo" layout="fill" objectFit="cover" />
      </div>
    </MainLayout>
  )
}

export default RouteIndex
