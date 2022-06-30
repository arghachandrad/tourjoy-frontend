import React from "react"
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBCardTitle,
} from "mdb-react-ui-kit"
import { Link } from "react-router-dom"

function CardTour({ imageFile, description, title, tags, _id, name }) {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "..."
    }
    return str
  }
  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="text-center">{name}</div>
        <span className="text-center">
          {tags.map((item) => (
            <Link to={`/tours/tag/${item}`} key={item}>
              #{item}
            </Link>
          ))}
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/tour/${_id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  )
}

export default CardTour
