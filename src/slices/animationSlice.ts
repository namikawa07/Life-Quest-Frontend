import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mainCharacter: null,
}

export const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {
    setMainCharacter: (state, action) => {
      if (action.payload === null) return
      state.mainCharacter = action.payload
    },
  },
})

export const { setMainCharacter } = animationSlice.actions
export default animationSlice.reducer
