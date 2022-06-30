import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./feature/authSlice"
import tourReducer from "./feature/tourSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
  },
})

window.store = store
export default store
