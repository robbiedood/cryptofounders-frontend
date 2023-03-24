import { createSlice } from '@reduxjs/toolkit'

export const founderProfileSlice = createSlice({
  name: 'founderProfile',
  initialState: {
    value: {
      accountAddress: '',
      foundingCoins: [],
      holderID: '',
      contact: {
        option: '',
        context: '',
        headshot: '',
        name: '',
        supplement: '',
      },
      offerSubmitted: [],
      offerReceived: [],
    }
  },
  reducers: {
    setFounderProfile: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // console.log(action.payload)
      
      // 判斷是否為contact, 如果是先wrap up contact, 把原本的contact和新的contact合併給action.payload
      if (action.payload?.contact) {
        action.payload.contact = {...state.value.contact, ...action.payload.contact}
      }
      state.value = {...state.value, ...action.payload}
    },
  }
})

// Action creators are generated for each case reducer function
export const { setFounderProfile } = founderProfileSlice.actions

export default founderProfileSlice.reducer