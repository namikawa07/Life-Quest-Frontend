import React, { useState } from 'react'
import AccountBottomSettingsListItem from './SettingsListItem'
import LogoutIcon from '@mui/icons-material/Logout'
import styles from '../../../../styles/account/bottom/settings/SettingsList.module.scss'
import BlockIcon from '@mui/icons-material/Block'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import DescriptionIcon from '@mui/icons-material/Description'
import CommonDialog from '../../../CommonDialog'

function AccountBottomSettingsList(props: any) {
  const { logoutHander } = props
  const [isOpenDialog, setDialog] = useState(false)

  const iconStyle = {
    width: '35px',
    height: '35px',
  }

  const settings: any = [
    {
      index: 0,
      icon: <DescriptionIcon sx={iconStyle} />,
      label: '利用規約',
    },
    {
      index: 1,
      icon: <PrivacyTipIcon sx={iconStyle} />,
      label: 'プライバシーポリシー',
    },
    {
      index: 2,
      icon: <BlockIcon sx={iconStyle} />,
      label: 'ブロック',
    },
  ]

  return (
    <>
      <div className={styles.settingsList}>
        {settings.map((setting: any) => {
          return (
            <AccountBottomSettingsListItem
              setting={setting}
              key={setting.index}
              icon={setting.icon}
            />
          )
        })}
      </div>
      <div className={styles.logout} onClick={() => setDialog(true)}>
        <div className={styles.logout__inner}>
          <LogoutIcon sx={{ color: 'var(--red)' }} />
          <span className={styles.logout__inner__text}>ログアウト</span>
        </div>
      </div>
      <CommonDialog isOpenDialog={isOpenDialog} setDialog={setDialog} />
    </>
  )
}

export default AccountBottomSettingsList
