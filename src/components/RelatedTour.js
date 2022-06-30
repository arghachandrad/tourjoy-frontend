import React from "react"
import {
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit"
import { Link } from "react-router-dom"

function RelatedTour({ relatedTours, tourId }) {
  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + "..."
    }
    return str
  }
  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && <h4>Related Tours</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedTours
              .filter((tour) => tour._id !== tourId)
              .splice(0, 3)
              .map((tour) => (
                <MDBCol key={tour._id}>
                  <Link to={`/tour/${tour._id}`}>
                    <MDBCardImage
                      src={tour.imageFile}
                      alt={tour.title}
                      position="top"
                    />
                  </Link>
                  <span className="text-start tag-card">
                    {tour.tags.map((tag) => (
                      <Link key={tag} to={`/tours/tag/${tag}`}>
                        #{tag}
                      </Link>
                    ))}
                  </span>
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {tour.title}
                    </MDBCardTitle>
                    <MDBCardText>{excerpt(tour.description)}</MDBCardText>
                  </MDBCardBody>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </>
  )
}

export default RelatedTour
