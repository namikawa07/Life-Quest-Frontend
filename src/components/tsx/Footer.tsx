import * as React from 'react'
import styles from '../styles/Footer.module.scss'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import BookmarksIcon from '@mui/icons-material/Bookmarks'

import SpeedDial from '../SpeedDial'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import { useRouter } from 'next/router'

export default function LabelBottomNavigation() {
  const router = useRouter()
  const [value, setValue] = React.useState('recents')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    console.log(`**********newValue ${newValue}`)
    if (newValue === 'Home') router.push('/')
  }

  const theme = createTheme({
    components: {
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            minWidth: '70px',
          },
        },
      },
    },
  })

  return (
    <div className={styles.wrapper}>
      <div>
        <SpeedDial />
      </div>
      <div className={styles.wrapper__inner}>
        <ThemeProvider theme={theme}>
          <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction
              label="ホーム"
              value="Home"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="検索"
              value="Search"
              icon={<SearchIcon />}
            />
            <div className={styles.centerButton}></div>
            <BottomNavigationAction
              label="通知"
              value="Notification"
              icon={<NotificationsIcon />}
            />
            <BottomNavigationAction
              label="保存"
              value="Favorite"
              icon={<BookmarksIcon />}
            />
          </BottomNavigation>
        </ThemeProvider>
      </div>
    </div>
  )
}
