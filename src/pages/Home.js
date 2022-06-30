import React, { useEffect } from "react"
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import { useDispatch, useSelector } from "react-redux"
import { getTours } from "../redux/feature/tourSlice"
import CardTour from "../components/CardTour"
import Spinner from "../components/Spinner"

function Home() {
  const dispatch = useDispatch()
  const { tours, loading } = useSelector((state) => ({ ...state.tour }))

  useEffect(() => {
    dispatch(getTours())
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours.map((tour) => (
                <CardTour key={tour._id} {...tour} />
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Home
