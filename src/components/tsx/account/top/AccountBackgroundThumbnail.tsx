import React from 'react'
import Image from 'next/image'
import { AccountBackgroundComponentType } from '../../../../types'
import styles from '../../../styles/account/top/AccountBackgroundThumbnail.module.scss'

function AccountBackground(props: AccountBackgroundComponentType) {
  const { thumbnailUrl } = props

  const selectThumbnailUrl = (thumbnailUrl: string) => {
    if (thumbnailUrl && thumbnailUrl !== 'default-thumbnail-url') {
      return thumbnailUrl
    } else {
      return '/background.jpeg'
    }
  }

  return (
    <div className={styles.background}>
      <Image
        src={selectThumbnailUrl(thumbnailUrl)}
        layout="fill"
        objectFit="cover"
        objectPosition="50% 50%"
      />
    </div>
  )
}

export default AccountBackground
