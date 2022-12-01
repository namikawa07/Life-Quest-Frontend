import React from 'react'
import styles from '../../styles/account/AccountTop.module.scss'

import AccountBackground from './top/AccountBackgroundThumbnail'
import AccountInformation from './top/AccountInformation'

import UserIcon from '../userIcon'

import { useSelector } from '../../../store'

function AccountTop() {
  const myProfile = useSelector((state) => state.profile.profile)

  const click = () => {
    console.log(`********`)
  }

  return (
    <>
      <AccountBackground thumbnailUrl={myProfile.thumbnail_url} />
      <div className={styles.top__icon}>
        <div className={styles.top__icon__wrapper}>
          <div className={styles.top__icon__wrapper__inner}>
            <UserIcon
              clickIconHandler={click}
              size={82}
              thumbnailUrl={myProfile.thumbnail_url}
            />
          </div>
        </div>
      </div>
      <AccountInformation myProfile={myProfile} />
    </>
  )
}

export default AccountTop
