import { configureStore } from '@reduxjs/toolkit'
import thoughtReducer from "./slices/thoughtSlice.js"
export const store = configureStore({
  reducer: {
    thought : thoughtReducer
  }
})