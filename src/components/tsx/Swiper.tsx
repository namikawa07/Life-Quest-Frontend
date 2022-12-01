import React, { useEffect, useState } from 'react'
// Swiperモジュール
import { Swiper, SwiperSlide } from 'swiper/react'

import AccountTop from './account/AccountTop'

// swiperで用意されているデフォルトののスタイル
import 'swiper/css'

export default function SwiperTab(props: any) {
  const { setActiveTabIndex, currentTabValue, Component4 } = props
  const [swiper, setSwiper] = useState<any>(null)

  useEffect(() => {
    if (swiper) swiper.slideTo(currentTabValue)
  }, [currentTabValue])

  return (
    <>
      <Swiper
        navigation={false}
        onSwiper={(swiper: any) => {
          setSwiper(swiper)
        }}
        onSlideChange={(swiper) => setActiveTabIndex(swiper.activeIndex)}
      >
        <SwiperSlide>
          Slide 1<AccountTop />
        </SwiperSlide>
        <SwiperSlide>
          Slide 2<AccountTop />
        </SwiperSlide>
        <SwiperSlide>
          Slide 3<AccountTop />
        </SwiperSlide>
        <SwiperSlide>{Component4}</SwiperSlide>
      </Swiper>
    </>
  )
}
