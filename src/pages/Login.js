import React, { useState, useEffect } from "react"
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
import { googleSignIn, login } from "../redux/feature/authSlice"

const initialState = {
  email: "",
  password: "",
}

function Login() {
  // prod => 676524661467-f5mlmgfuomcfilu5kur9upe4n3nnnqca.apps.googleusercontent.com
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => ({ ...state.auth }))
  const [formValue, setFormValue] = useState(initialState)
  const { email, password } = formValue

  const devEnv = process.env.NODE_ENV !== "production"
  const clientId = devEnv
    ? "676524661467-ssc2uvc40gcah86elf7m5kalrjqnpasu.apps.googleusercontent.com"
    : "676524661467-f5mlmgfuomcfilu5kur9upe4n3nnnqca.apps.googleusercontent.com"

  const handleCallbackResponse = (response) => {
    dispatch(googleSignIn({ token: response.credential, navigate, toast }))
  }

  const handleGoogleLoginInit = () => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    })
    // google.accounts.id.prompt()
  }

  const loadScript = (url, callback) => {
    // create script then initialize btn
    let script = document.createElement("script")
    script.setAttribute("async", "")
    script.setAttribute("defer", "")
    // script.type = "text/javascript"

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = () => callback()
    }

    script.src = url
    document.getElementsByTagName("head")[0].appendChild(script)
  }

  useEffect(() => {
    // load script then initialize google signin button
    loadScript(`https://accounts.google.com/gsi/client`, () =>
      handleGoogleLoginInit()
    )
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email && password) {
      dispatch(login({ formValue, navigate, toast }))
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
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <div id="signInDiv" className="col-12"></div>
          {/* <MDBBtn style={{ width: "100%" }} color="danger" onClick={login}>
            <MDBIcon className="me-2" fab icon="google" /> Google Sign In
          </MDBBtn> */}
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Login
