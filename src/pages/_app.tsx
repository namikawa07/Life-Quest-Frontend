import React from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import Header from '../components/tsx/Header'
import Footer from '../components/tsx/Footer'

import useSize from '~/modules/useMedia'
import { useSelector } from '../store'

function HeaderComponent() {
  return <Header />
}

function FooterComponent() {
  const myProfile = useSelector((state) => state.profile.profile)

  return (
    <>
      {useSize().isMobileSize && myProfile && myProfile.uuid ? (
        <Footer />
      ) : (
        <></>
      )}
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          width: '300px',
          margin: '16px auto',
          borderRadius: '18px',
          fontSize: '14px',
        }}
      />
      <HeaderComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </Provider>
  )
}

export default MyApp
