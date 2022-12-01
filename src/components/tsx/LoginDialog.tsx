import React, { useState } from 'react'
import styles from '../styles/LoginDialog.module.scss'
import useSize from '~/modules/useMedia'
import PropTypes from 'prop-types'

// import component ---------------------------------------
import LoginInner from './login/Inner'
import PasswordResetInner from './login/PasswordReset'
// import component ---------------------------------------

// Mui Service --------------------------------------
import { Dialog } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

import Slide from '@mui/material/Slide'
import Zoom from '@mui/material/Zoom'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
// Mui Service --------------------------------------

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  let openDialogTransition
  if (useSize().isMobileSize) {
    openDialogTransition = <Slide direction="up" ref={ref} {...props} />
  } else {
    openDialogTransition = <Zoom ref={ref} {...props} />
  }
  return openDialogTransition
})

// プロパティ
LoginDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

function LoginDialog(props: any) {
  // プロパティの受け取り
  const { onClose, isOpen } = props

  const [checked, setChecked] = useState(false)
  const [isDisplayPasswordReset, setPasswordReset] = useState(false)

  const switchHandler = (isSwitch: boolean) => {
    setChecked(isSwitch)
  }

  const openPasswordResetInnerHandler = (isDisplay: boolean) => {
    setPasswordReset(isDisplay)
  }

  const closeHandler = () => {
    console.log(`*******aaaaa`)
    onClose()
    setPasswordReset(false)
  }

  const backPageHandle = () => {
    setPasswordReset(false)
  }

  const DialogPaperStyle = () => {
    if (!useSize().isMobileSize)
      return {
        style: {
          borderRadius: '14px',
        },
      }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeHandler}
      TransitionComponent={Transition}
      fullScreen={useSize().isMobileSize ? true : false}
      PaperProps={DialogPaperStyle()}
    >
      <div className={styles.dialog}>
        {useSize().isMobileSize ? (
          <div className={styles.dialog__mobileBar}></div>
        ) : (
          <></>
        )}
        {isDisplayPasswordReset ? (
          <ArrowBackIcon
            onClick={backPageHandle}
            className={styles.dialog__back}
          />
        ) : (
          <></>
        )}
        <CloseIcon onClick={closeHandler} className={styles.dialog__close} />
        {isDisplayPasswordReset ? (
          <PasswordResetInner closeHandler={closeHandler} />
        ) : (
          <LoginInner
            checked={checked}
            switchHandler={switchHandler}
            openPasswordResetInnerHandler={openPasswordResetInnerHandler}
            closeHandler={closeHandler}
          />
        )}
      </div>
    </Dialog>
  )
}

export default LoginDialog
