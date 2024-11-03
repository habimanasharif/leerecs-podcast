import { configureStore } from '@reduxjs/toolkit'
import musicPlayer from './data/musicPlayer'
import userAuth from './data/userAuth'
import uiData from './data/uiData'


export const makeStore = () => {
  return configureStore({
    reducer: {
      musicPlayer,
      userAuth,
      uiData:uiData,

    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']