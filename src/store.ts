import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import counterReducer from './slices/counterSlice'
import dialogReducer from './slices/dialogSlice'
import todosReducer from './slices/todosSlice'
import profileReducer from './slices/profileSlice'

import { proxy } from 'valtio'
import { AnimationName, TextureName } from './types'

// animation: ファイル名かつアクション名を管理
// texture: モデルのテクスチャーを管理
// isPaused: アニメーションの実行状態を管理（一時停止かどうか）
// proxyのなかで定義されている値は、それぞれの初期値
type Model = {
  animation: AnimationName
  texture: {
    body: TextureName
    joint: TextureName
  }
  isPaused: boolean
}

export const modelState = proxy<Model>({
  animation: 'walking',
  texture: {
    body: '293534_B2BFC5_738289_8A9AA7',
    joint: '3A2412_A78B5F_705434_836C47',
  },
  isPaused: true,
})

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    dialog: dialogReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
