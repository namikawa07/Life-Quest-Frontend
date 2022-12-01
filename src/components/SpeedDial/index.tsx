import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import EditIcon from '@mui/icons-material/Edit'

import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import styles from './index.module.scss'

const actions = [
  { index: 0, icon: <FileCopyIcon />, name: 'Copy', class: 'right_icon' },
  { index: 1, icon: <SaveIcon />, name: 'Save', class: 'center_icon' },
  { index: 2, icon: <PrintIcon />, name: 'Print', class: 'left_icon' },
]

export default function OpenIconSpeedDial() {
  const [isToggle, setValue] = useState(false)

  const toggleHandler = (isToggle: boolean) => {
    if (isToggle) setValue(!isToggle)
    if (!isToggle) setValue(isToggle)
  }

  const theme = createTheme({
    components: {
      MuiSpeedDial: {
        styleOverrides: {
          root: {
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            WebkitTransform: 'translate(-50%, 0%)',
            MsTransform: 'translate(-50%, 0%)',
          },
          fab: {
            backgroundColor: 'var(--orange)',
            '&:hover': {
              backgroundColor: 'var(--orange)',
            },
          },
        },
      },

      MuiSpeedDialAction: {
        styleOverrides: {
          fab: {
            width: '55px',
            height: '55px',
          },
        },
      },
    },
  })

  return (
    <Box
      onClick={() => toggleHandler(isToggle)}
      sx={{ height: 0, transform: 'translateZ(0px)', flexGrow: 1 }}
    >
      <ThemeProvider theme={theme}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              className={styles[action.class]}
              key={action.index}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </ThemeProvider>
    </Box>
  )
}
