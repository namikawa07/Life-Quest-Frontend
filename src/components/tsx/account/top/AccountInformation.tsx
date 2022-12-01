import React from 'react'
import styles from '../../../styles/account/top/AccountInformation.module.scss'

import AccountDescription from './AccountDescription'
import AccountProfileBar from './AccountProfileBar'

function AccountInformation(props: any) {
  const { myProfile } = props

  return (
    <div className={styles.information}>
      <div className={styles.information__name}>
        <span>{myProfile.name}</span>
      </div>
      <AccountDescription description={myProfile.self_introduction} />
      <AccountProfileBar />
      <div className={styles.information__infoList}>
        <div className={styles.information__infoList__item}>
          <div className={styles.information__infoList__item__count}>206</div>
          <div>フォロー中</div>
        </div>
        <div className={styles.information__infoList__bar}></div>
        <div className={styles.information__infoList__item}>
          <div className={styles.information__infoList__item__count}>342</div>
          <div>フォロワー</div>
        </div>
        <div className={styles.information__infoList__bar}></div>
        <div className={styles.information__infoList__item}>
          <div className={styles.information__infoList__item__count}>257</div>
          <div>いいね</div>
        </div>
        <div className={styles.information__infoList__bar}></div>
        <div className={styles.information__infoList__item}>
          <div className={styles.information__infoList__item__count}>3.1K</div>
          <div>視聴者数</div>
        </div>
      </div>
    </div>
  )
}

export default AccountInformation
