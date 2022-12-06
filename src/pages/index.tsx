import type { NextPage } from 'next'
import MainLayout from '../layouts'
import React from 'react'

import { YBot } from '../components/tsx/webGL/character/model/YBot'

const RouteIndex: NextPage = () => {
  return (
    <MainLayout>
      <YBot />
    </MainLayout>
  )
}

export default RouteIndex
