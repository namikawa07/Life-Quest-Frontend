import styles from '../../styles/login/buttonListItem.module.scss'
import Image from 'next/image'

// import typecript ---------------------------------------
import { ButtonListItemType } from '../../../types'
// import typecript ---------------------------------------

// import images ---------------------------------------
import GoogleIcon from '../../../images/google.svg'
import AppleIcon from '../../../images/apple.svg'
import TwitterIcon from '../../../images/twitter.svg'
import FacebookIcon from '../../../images/facebook.svg'
// import images ---------------------------------------

function SignUpButton(props: ButtonListItemType) {
  const { serviceTitle, LoginServiceHandler } = props

  let Icon
  switch (serviceTitle) {
    case 'Apple':
      Icon = AppleIcon
      break
    case 'Google':
      Icon = GoogleIcon
      break
    case 'Twitter':
      Icon = TwitterIcon
      break
    case 'Facebook':
      Icon = FacebookIcon
      break
  }

  const firebaseAuthLogin = (type: string) => {
    LoginServiceHandler(type)
  }

  return (
    <div className={styles.loginButton}>
      <div className={styles.loginButton__loginServiceIcon}>
        <Image
          src={Icon}
          alt="logo"
          objectFit="cover"
          width={24}
          height={24}
          onClick={() => firebaseAuthLogin(serviceTitle)}
        />
      </div>
    </div>
  )
}

export default SignUpButton
