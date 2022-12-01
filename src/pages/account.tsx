import type { NextPage } from 'next'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import React, { useEffect } from 'react'
import AccountTop from '../components/tsx/account/AccountTop'
import AccountBottom from '../components/tsx/account/AccountBottom'
import Router from 'next/router'
import { useSelector } from '../store'
import { auth } from '../firebase'

const Account: NextPage = () => {
  const myProfile = useSelector((state) => state.profile.profile)

  useEffect(() => {
    if (!myProfile || (myProfile && !myProfile.uuid))
      Router.push({ pathname: '/' })
    /*
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        if (!myProfile || (myProfile && !myProfile.uuid))
          Router.push({ pathname: '/' })
      }
    })
    */
  })

  return (
    <MainLayout>
      <AccountTop></AccountTop>
      <AccountBottom></AccountBottom>
    </MainLayout>
  )
}

export default Account
