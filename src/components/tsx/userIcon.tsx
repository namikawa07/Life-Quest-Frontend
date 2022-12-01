import React from 'react'
import Image from 'next/image'
import { UserIconComponentType } from '../../types'
import defaultIcon from '../../images/default-icon-gray.svg'

function UserIcon(props: UserIconComponentType) {
  const { clickIconHandler, size, thumbnailUrl } = props

  const iconThumbnailUrl = (thumbnailUrl: any) => {
    const icon =
      !thumbnailUrl || thumbnailUrl === 'default-thumbnail-url'
        ? defaultIcon
        : thumbnailUrl

    return icon
  }

  return (
    <div onClick={() => clickIconHandler()}>
      <Image
        src={iconThumbnailUrl(thumbnailUrl)}
        alt="user icon"
        width={size}
        height={size}
        style={{ borderRadius: '50%' }}
      />
    </div>
  )
}

export default UserIcon
