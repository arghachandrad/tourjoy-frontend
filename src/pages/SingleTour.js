import React, { useEffect } from "react"
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import moment from "moment"
import { getRelatedTours, getTour } from "../redux/feature/tourSlice"
import Spinner from "../components/Spinner"
import RelatedTour from "../components/RelatedTour"

function SingleTour() {
  const dispatch = useDispatch()
  const { tour, loading, relatedTours } = useSelector((state) => ({
    ...state.tour,
  }))
  const { id } = useParams()
  const tags = tour?.tags

  useEffect(() => {
    tags && dispatch(getRelatedTours({ tags }))
  }, [tags, dispatch])

  useEffect(() => {
    dispatch(getTour(id))
  }, [id, dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={tour?.imageFile}
            alt={tour?.title}
          />
          <MDBCardBody>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour?.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour?.tags && tour?.tags.map((tag) => `#${tag}`)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour?.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour?.description}
            </MDBCardText>
          </MDBCardBody>

          {/* related tours */}
          <RelatedTour relatedTours={relatedTours} tourId={tour._id} />
        </MDBCard>
      </MDBContainer>
    </>
  )
}

export default SingleTour
