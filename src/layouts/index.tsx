import React from 'react'
import styles from './index.module.scss'

type LayoutProps = {
  children: React.ReactNode
}

function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  )
}

export default MainLayout
