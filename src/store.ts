import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import counterReducer from './slices/counterSlice'
import dialogReducer from './slices/dialogSlice'
import todosReducer from './slices/todosSlice'
import profileReducer from './slices/profileSlice'

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
