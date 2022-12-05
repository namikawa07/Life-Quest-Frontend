import React, { useEffect } from 'react'
import styles from '../styles/Header.module.scss'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { useSelector, AppDispatch } from '../../store'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

// -------------------- components --------------------
import LoginDialog from './LoginDialog'
import UserIcon from './userIcon'
// -------------------- components --------------------

// ---------------------- slicer ----------------------
import { openDialog, closeDialog } from '../../slices/dialogSlice'
import { fetchMyProfile } from '../../slices/profileSlice'
// ---------------------- slicer ----------------------

import Person2TwoToneIcon from '@mui/icons-material/Person2TwoTone'

const pushRouter = () => {
  const path = location.pathname

  if (path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    Router.push({ pathname: '/' })
  }
}

function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const isOpenDialog = useSelector((state) => state.dialog.isOpen)
  const myProfile = useSelector((state) => state.profile.profile)

  useEffect(() => {
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        dispatch(fetchMyProfile())
        console.log(`================== logined user ${user.uuid}`)
      }
    })
  }, [dispatch])

  const openDialogHandler = () => {
    dispatch(openDialog())
  }

  const pushAccountPageHandler = () => {
    router.push('/account')
  }

  return (
    <section className={styles.wrapper}>
      <header>
        <div onClick={() => pushRouter()}>
          <a>
            <span className={styles.title}>Life Quest</span>
          </a>
        </div>
        <LoginDialog
          isOpen={isOpenDialog}
          onClose={() => dispatch(closeDialog())}
        />
        <div className={styles.defaultIcon}>
          {myProfile && !myProfile.uuid ? (
            <Person2TwoToneIcon
              fontSize="large"
              onClick={() => openDialogHandler()}
            />
          ) : (
            <UserIcon
              clickIconHandler={pushAccountPageHandler}
              size={46}
              thumbnailUrl={myProfile.thumbnail_url}
            />
          )}
        </div>
      </header>
    </section>
  )
}

export default Header
