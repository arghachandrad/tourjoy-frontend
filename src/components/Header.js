import React, { useState } from "react"
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
  MDBNavbarItem,
} from "mdb-react-ui-kit"
import { useSelector, useDispatch } from "react-redux"
import { setLogout } from "../redux/feature/authSlice"
import { searchTours } from "../redux/feature/tourSlice"

function Header() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state.auth }))
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState("")

  const handleLogout = () => {
    dispatch(setLogout())
  }

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(searchTours(search))
    setSearch("")
  }

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
        >
          TourJoy
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h6 style={{ marginRight: "30px", marginTop: "17px" }}>
                Logged in as: {user?.result?.name}
              </h6>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-text">Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}

            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={handleLogout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header
