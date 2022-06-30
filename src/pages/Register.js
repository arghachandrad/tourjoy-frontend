import React, { useState } from "react"
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { register } from "../redux/feature/authSlice"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => ({ ...state.auth }))
  const [formValue, setFormValue] = useState(initialState)
  const { firstName, lastName, email, password, confirmPassword } = formValue

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword)
      return toast.error("Password and confirm password didn't match")

    if (email && firstName && lastName && password && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }))
    }
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setFormValue((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={handleInputChange}
                required
                invalid
                validation="Please provide correct first name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={handleInputChange}
                required
                invalid
                validation="Please provide correct last name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={handleInputChange}
                required
                invalid
                validation="Please provide correct email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={handleInputChange}
                required
                invalid
                validation="Please provide correct password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password Confirm"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
                required
                invalid
                validation="Please provide correct confirm password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Aleady have an account ? Please Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Register
