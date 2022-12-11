import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import counterReducer from './slices/counterSlice'
import dialogReducer from './slices/dialogSlice'
import todosReducer from './slices/todosSlice'
import profileReducer from './slices/profileSlice'
import animationReducer from './slices/animationSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    dialog: dialogReducer,
    profile: profileReducer,
    animation: animationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
