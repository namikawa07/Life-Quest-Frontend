import styles from '../../styles/login/Inner.module.scss'
import { SignInSwitchesType } from '../../../types'

// import component ---------------------------------------
import LoginButtonList from './buttonList'
import LoginTextField from './TextField'
// import component ---------------------------------------

// Mui Service --------------------------------------
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Switch from '@mui/material/Switch'
// Mui Service --------------------------------------

import { auth, googleProvider, appleProvider } from '../../../firebase'
import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from 'firebase/auth'

import { SignInUser } from '../../../slices/profileSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import { toast } from 'react-toastify'

function SignInSwitches(props: SignInSwitchesType) {
  const { checked, switchHandler } = props

  const switchLoginTheme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: '260px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
          },
          track: {
            borderRadius: '21px',
            background: 'var(--gray-2)',
          },
          thumb: {
            width: '110px',
            height: '38px',
            borderRadius: '17px',
          },
          switchBase: {
            '&.Mui-checked': {
              transform: 'translateX(120px)',
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            width: '140px',
            height: '70px',
            left: '5px',
          },
        },
      },
    },
  })

  return (
    <div className={styles.switch}>
      <div className={styles.switch__inner}>
        <span
          className={`${styles.switch__inner__login} ${
            checked
              ? styles.switch__inner__negative
              : styles.switch__inner__positive
          }`}
          onClick={() => switchHandler(false)}
        >
          新規登録
        </span>
        <span
          className={`${styles.switch__inner__signin} ${
            checked
              ? styles.switch__inner__positive
              : styles.switch__inner__negative
          }`}
          onClick={() => switchHandler(true)}
        >
          ログイン
        </span>
        <ThemeProvider theme={switchLoginTheme}>
          <Switch checked={checked} color="default" />
        </ThemeProvider>
      </div>
    </div>
  )
}

function LoginInner(props: any) {
  const dispatch = useDispatch<AppDispatch>()
  // プロパティの受け取り
  const {
    checked,
    switchHandler,
    openPasswordResetInnerHandler,
    closeHandler,
  } = props

  const LoginServiceHandler = (serviceType: string) => {
    console.log(`**********serviceType ${serviceType}`)
    switch (serviceType) {
      case 'Apple':
        LoginByApple()
        break
      case 'Google':
        LoginByGoogle()
        break
      case 'Twitter':
        LoginByTwitter()
        break
      case 'Facebook':
        LoginByFacebook()
        break
    }
  }
  // auth -------------------------------------------
  const LoginByApple = () => {
    signInWithPopup(auth, appleProvider)
      .then((result) => {
        // The signed-in user info.
        // Apple credential
        const userCredential: any = OAuthProvider.credentialFromResult(result)

        const firebaseAuthParams = {
          access_token: userCredential.accessToken,
          refresh_token: result.user.refreshToken,
          tenant_id: result.user.tenantId,
        }

        closeHandler()
        dispatch(SignInUser(firebaseAuthParams))
      })
      .catch(() => {
        // Handle Errors here.
        /*
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The credential that was used.
        const credential = OAuthProvider.credentialFromError(error)

        // ...
        */
      })
  }
  const LoginByGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const userCredential: any =
          GoogleAuthProvider.credentialFromResult(result)

        const firebaseAuthParams = {
          access_token: userCredential.accessToken,
          refresh_token: result.user.refreshToken,
          tenant_id: result.user.tenantId,
        }

        closeHandler()
        dispatch(SignInUser(firebaseAuthParams))
      })
      .catch(() => {
        toast.error('Googleログインに失敗しました')
      })
  }
  const LoginByTwitter = () => {
    console.log(`*******LoginByTwitter`)
  }
  const LoginByFacebook = () => {
    console.log(`*******LoginByFacebook`)
  }
  // auth -------------------------------------------

  return (
    <div>
      <SignInSwitches checked={checked} switchHandler={switchHandler} />
      <div className={styles.dialog__loginTitle}>
        <div className={styles.dialog__loginTitle__lineLeft}></div>
        {checked ? (
          <span className={styles.dialog__loginTitle__text}>ログイン</span>
        ) : (
          <span className={styles.dialog__loginTitle__text}>新規登録</span>
        )}
        <div className={styles.dialog__loginTitle__lineRight}></div>
      </div>
      <LoginTextField
        dialogType={checked ? 'login' : 'signup'}
        openPasswordResetInnerHandler={openPasswordResetInnerHandler}
        closeHandler={closeHandler}
      />
      <div className={styles.dialog__or}>
        <div className={styles.dialog__or__line}></div>
        <span className={styles.dialog__or__text}>or</span>
        <div className={styles.dialog__or__line}></div>
      </div>
      <LoginButtonList
        dialogType={checked ? 'login' : 'signup'}
        LoginServiceHandler={LoginServiceHandler}
      />
    </div>
  )
}

export default LoginInner
