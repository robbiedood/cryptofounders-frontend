import { createSlice } from '@reduxjs/toolkit'

export const isConnectedSlice = createSlice({
  name: 'isConnected',
  initialState: {
    value: false
  },
  reducers: {
    updateConnectSuccess: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateConnectSuccess } = isConnectedSlice.actions

export default isConnectedSlice.reducer