import styles from '../../styles/login/buttonList.module.scss'

// import component ---------------------------------------
import SignUpButton from './buttonListItem'
// import component ---------------------------------------

function SignUpButtonList(props: any) {
  const { dialogType, LoginServiceHandler } = props

  const signUpTitles = ['Apple', 'Google', 'Twitter', 'Facebook']

  return (
    <div className={styles.buttonList}>
      {signUpTitles.map((title, index) => {
        return (
          <SignUpButton
            key={`title-${index}`}
            serviceTitle={title}
            dialogType={dialogType}
            LoginServiceHandler={LoginServiceHandler}
          />
        )
      })}
    </div>
  )
}

export default SignUpButtonList
