import { configureStore } from '@reduxjs/toolkit'
import isConnectedReducer from './isConnectedSlice';
import setFounderProfileReducer from './founderProfileSlice';
import setCoinAllReducer from './coinAllSlice';
import setTopHoldersReducer from './topHoldersSlice';

const store = configureStore({
  reducer: {
    isConnected: isConnectedReducer,
    founderProfile: setFounderProfileReducer,
    coinAll: setCoinAllReducer,
    topHolders: setTopHoldersReducer,
  }
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch