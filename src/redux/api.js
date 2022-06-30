import axios from "axios"
import { toast } from "react-toastify"
// import store from "../redux/store"
import { setLogout } from "./feature/authSlice"

const devEnv = process.env.NODE_ENV !== "production"
console.log("NODE_ENV: ", process.env.NODE_ENV)

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  }
  return req
})

API.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    const { status, data } = error.response
    if (status === 401 || status === 403) {
      toast.info(data.message)
      window.store.dispatch(setLogout())
    }
    return Promise.reject(error)
  }
)

// auth apis
export const signIn = (formData) => API.post("/users/signin", formData)
export const signUp = (formData) => API.post("/users/signup", formData)
export const googleSignIn = (token) =>
  API.post("/users/googleSignIn", { token })

// tour apis
export const createTour = (tourData) => API.post("/tour", tourData)
export const getTours = () => API.get("/tour")
export const getTour = (id) => API.get(`/tour/${id}`)
export const deleteTour = (id) => API.delete(`/tour/${id}`)
export const updateTour = (updatedTourData, id) =>
  API.patch(`/tour/${id}`, updatedTourData)
export const getToursByUser = (id) => API.get(`/tour/userTours/${id}`) // user id

export const getToursBySearch = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`)
export const getToursByTag = (tag) => API.get(`/tour/tag/${tag}`)
export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags)
