import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import DashboardIcon from '@mui/icons-material/Dashboard'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import SettingsIcon from '@mui/icons-material/Settings'

import Swiper from '../Swiper'

import AccountBottomSettingsList from './bottom/settings/SettingsList'

import { auth } from '../../../firebase'
import { toast } from 'react-toastify'

function AccountBottom() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChange2 = (newValue: number) => {
    setValue(newValue)
  }

  const logoutHander = () => {
    auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        auth
          .signOut()
          .then(() => {
            window.location.reload()
            toast.success('ログアウトしました')
          })
          .catch(() => {
            toast.error('ログアウトに失敗しました')
          })
      }
    })
  }

  const settingsComponent = () => {
    return (
      <>
        <AccountBottomSettingsList logoutHander={logoutHander} />
      </>
    )
  }

  const TabTheme = createTheme({
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            width: '25%',
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '28px',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: 'var(--orange)',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: 'var(--orange)',
          },
          root: {
            borderBottom: '1px solid var(--gray)',
          },
        },
      },
    },
  })

  return (
    <>
      <ThemeProvider theme={TabTheme}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
        >
          <Tab icon={<DashboardIcon />} value={0} aria-label="dashboard" />
          <Tab icon={<FavoriteIcon />} value={1} aria-label="favorite" />
          <Tab icon={<BookmarksIcon />} value={2} aria-label="bookmark" />
          <Tab icon={<SettingsIcon />} value={3} aria-label="settings" />
        </Tabs>
      </ThemeProvider>
      <Swiper
        setActiveTabIndex={handleChange2}
        currentTabValue={value}
        Component4={settingsComponent}
      />
    </>
  )
}

export default AccountBottom
