import React, { useEffect } from "react"
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit"
import { useParams, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { getTagTours } from "../redux/feature/tourSlice"

function TagTours() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tag } = useParams()
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }))

  useEffect(() => {
    if (tag) {
      dispatch(getTagTours(tag))
    }
  }, [tag, dispatch])

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + "..."
    }
    return str
  }

  if (loading) return <Spinner />
  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h3 className="text-center">Tours with tags: {tag}</h3>
      <hr style={{ maxWidth: "570px" }} />
      {tagTours &&
        tagTours.map((tour) => (
          <MDBCardGroup key={tour._id}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={tour.imageFile}
                    alt={tour.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {tour.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      {excerpt(tour.description)}
                    </MDBCardText>
                    <div style={{ float: "left", marginTop: "-10px" }}>
                      <MDBBtn
                        size="sm"
                        rounded
                        color="info"
                        onClick={() => navigate(`/tour/${tour._id}`)}
                      >
                        Read More
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  )
}

export default TagTours
