import React, { useRef, useState } from 'react'
import styles from '../../styles/login/TextField.module.scss'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'

// auth -------------------------------------------
import {
  auth,
  createWithEmailAndPasswordError,
  signInWithEmailAndPasswordError,
} from '../../../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { signUpUser, SignInUser } from '../../../slices/profileSlice'
// auth -------------------------------------------

import { toast } from 'react-toastify'

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>
const EmailVaildPattern =
  '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'

function LoginTextField(props: any) {
  const { dialogType, openPasswordResetInnerHandler, closeHandler } = props

  const dispatch = useDispatch<AppDispatch>()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const formValidation = (): boolean => {
    let valid = true

    const e = emailRef?.current
    if (e) {
      const ok = e.validity.valid
      setEmailError(!ok)
      valid &&= ok
    }
    const p = passwordRef?.current
    if (p) {
      if (passwordValue.length < 6) {
        p.setCustomValidity('パスワードは6文字以上にしてください')
      } else {
        p.setCustomValidity('')
      }
      const ok = p.validity.valid
      setPasswordError(!ok)
      valid &&= ok
    }
    const c = confirmPasswordRef?.current
    if (c) {
      if (
        confirmPasswordValue.length > 0 &&
        passwordValue !== confirmPasswordValue
      ) {
        c.setCustomValidity('パスワードが一致しません')
      } else {
        c.setCustomValidity('')
      }

      const ok = c.validity.valid
      setConfirmPasswordError(!ok)
      valid &&= ok
    }

    return valid
  }

  const isActiveButton = (dialogType: string): boolean => {
    let isActive = false
    if (dialogType === 'login') {
      if (
        emailValue &&
        passwordValue &&
        emailValue !== '' &&
        passwordValue !== ''
      )
        isActive = true
    }

    if (dialogType === 'signup') {
      if (
        emailValue &&
        passwordValue &&
        confirmPasswordValue &&
        emailValue !== '' &&
        passwordValue !== '' &&
        confirmPasswordValue !== ''
      )
        isActive = true
    }

    if (dialogType === 'reset-password') {
      if (emailValue && emailValue !== '') isActive = true
    }

    return isActive
  }

  const sendButtonText = (dialogType: string) => {
    let buttonText = ''
    if (dialogType === 'login') buttonText = 'ログインする'
    if (dialogType === 'signup') buttonText = '新規登録する'
    if (dialogType === 'reset-password') buttonText = 'パスワードをリセットする'

    return buttonText
  }

  const InputTheme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
          },
        },
      },
    },
  })

  let ButtonTheme
  if (isActiveButton(dialogType)) {
    ButtonTheme = createTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              backgroundColor: 'var(--white)',
              height: '50px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'var(--white)',
                height: '50px',
                borderRadius: '8px',
              },
            },
          },
        },
      },
    })
  } else {
    ButtonTheme = createTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              backgroundColor: 'var(--gray-2)',
              height: '50px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'var(--gray-2)',
                height: '50px',
                borderRadius: '8px',
              },
            },
          },
        },
      },
    })
  }

  // auth -------------------------------------------
  const sendLoginHandler = () => {
    if (!formValidation()) return

    if (dialogType === 'signup') {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const firebaseAuthParams = {
            access_token: null,
            refresh_token: userCredential.user.refreshToken,
            tenant_id: userCredential.user.tenantId,
          }

          dispatch(signUpUser(firebaseAuthParams))
        })
        .catch((error) => {
          // firebaseへの外部接続が失敗した場合
          const errorStr = createWithEmailAndPasswordError(
            error.code.toString()
          )

          console.error(
            `======================== firebase sign up error ${errorStr}`
          )
          toast.error(errorStr)
        })
    }

    if (dialogType === 'login') {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const firebaseAuthParams = {
            access_token: null,
            refresh_token: userCredential.user.refreshToken,
            tenant_id: userCredential.user.tenantId,
          }

          dispatch(SignInUser(firebaseAuthParams))
        })
        .catch((error) => {
          // firebaseへの外部接続が失敗した場合
          const errorStr = signInWithEmailAndPasswordError(
            error.code.toString()
          )

          console.error(
            `======================== firebase sign in error ${errorStr}`
          )
          toast.error(errorStr)
        })
    }

    if (dialogType === 'reset-password') {
      // FIXME: animation-app-....firebaseapp.comの変なメールから送られるのでここ変更する
      sendPasswordResetEmail(auth, emailValue).then(() => {
        toast.success(
          '記入したアドレスにパスワードリセットのメールを送信しました！'
        )
        // Password reset email sent!
        // ..
      })
    }

    closeHandler()
  }
  // auth -------------------------------------------

  return (
    <div>
      <ThemeProvider theme={InputTheme}>
        <TextField
          margin="normal"
          fullWidth
          required
          inputRef={emailRef}
          value={emailValue}
          error={emailError}
          helperText={emailError && emailRef?.current?.validationMessage}
          inputProps={{ required: true, pattern: EmailVaildPattern }}
          onChange={(e: OnChangeEvent) => setEmailValue(e.target.value)}
          label="メールアドレス"
        />

        {dialogType === 'reset-password' ? (
          <div className={styles.blank}></div>
        ) : (
          <TextField
            margin="normal"
            fullWidth
            required
            type="password"
            inputRef={passwordRef}
            value={passwordValue}
            error={passwordError}
            helperText={
              passwordError && passwordRef?.current?.validationMessage
            }
            inputProps={{ required: true }}
            onChange={(e: OnChangeEvent) => setPasswordValue(e.target.value)}
            label="パスワード"
          />
        )}

        {dialogType === 'signup' ? (
          <TextField
            margin="normal"
            fullWidth
            required
            type="password"
            inputRef={confirmPasswordRef}
            value={confirmPasswordValue}
            error={confirmPasswordError}
            helperText={
              confirmPasswordError &&
              confirmPasswordRef?.current?.validationMessage
            }
            inputProps={{ required: true }}
            onChange={(e: OnChangeEvent) =>
              setConfirmPasswordValue(e.target.value)
            }
            label="確認用パスワード"
          />
        ) : (
          <div className={styles.blank}></div>
        )}
      </ThemeProvider>

      <ThemeProvider theme={ButtonTheme}>
        <Button
          disabled={!isActiveButton(dialogType)}
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => {
            sendLoginHandler()
          }}
        >
          <span
            className={isActiveButton(dialogType) ? styles.activeButton : ''}
          >
            {sendButtonText(dialogType)}
          </span>
        </Button>
      </ThemeProvider>
      {dialogType === 'reset-password' ? (
        <></>
      ) : (
        <div className={styles.resetPassword}>
          <span>
            パスワードを忘れた方は
            <span
              className={styles.resetPassword__text}
              onClick={() => openPasswordResetInnerHandler(true)}
            >
              こちら
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

export default LoginTextField
