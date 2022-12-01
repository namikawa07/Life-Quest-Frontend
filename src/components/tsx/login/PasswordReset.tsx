import styles from '../../styles/login/PasswordReset.module.scss'

// import component ---------------------------------------
import LoginTextField from './TextField'
// import component ---------------------------------------

function PasswordResetInner(props: any) {
  const { closeHandler } = props

  return (
    <div>
      <div className={styles.passwordReset__top}>
        <div className={styles.passwordReset__top__inner}>
          <div className={styles.passwordReset__top__inner__button}>
            <span className={styles.passwordReset__top__inner__button__text}>
              パスワードリセット
            </span>
          </div>
        </div>
      </div>
      <div className={styles.passwordReset__loginTitle}>
        <div className={styles.passwordReset__loginTitle__lineLeft}></div>
        <span className={styles.passwordReset__loginTitle__text}>
          パスワードリセット
        </span>
        <div className={styles.passwordReset__loginTitle__lineRight}></div>
      </div>
      <LoginTextField
        dialogType={'reset-password'}
        closeHandler={closeHandler}
      />
    </div>
  )
}

export default PasswordResetInner
