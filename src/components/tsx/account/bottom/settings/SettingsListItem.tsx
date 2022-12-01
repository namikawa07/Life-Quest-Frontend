import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import styles from '../../../../styles/account/bottom/settings/SettingsListItem.module.scss'

function AccountBottomSettingsListItem(props: any) {
  const { setting } = props
  return (
    <div>
      <Card sx={{ width: '80px', height: '80px' }}>
        <CardActionArea sx={{ width: '100%', height: '100%' }}>
          <CardContent
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {setting.icon}
          </CardContent>
        </CardActionArea>
      </Card>
      <div className={styles.settingsListItem__title}>{setting.label}</div>
    </div>
  )
}

export default AccountBottomSettingsListItem
