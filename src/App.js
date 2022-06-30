import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setUser } from "./redux/feature/authSlice"
import AddEditTour from "./pages/AddEditTour"
import SingleTour from "./pages/SingleTour"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import NotFound from "./pages/NotFound"
import TagTours from "./pages/TagTours"

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"))

  useEffect(() => {
    dispatch(setUser(user))
  }, [dispatch, user])

  return (
    <BrowserRouter>
      <div>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours/search" element={<Home />} />
          <Route path="/tours/tag/:tag" element={<TagTours />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addTour"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route
            path="/editTour/:id"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route path="/tour/:id" element={<SingleTour />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
