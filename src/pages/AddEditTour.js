import React, { useState, useEffect } from "react"
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit"
import ChipInput from "material-ui-chip-input"
import FileBase from "react-file-base64"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createTour, updateTour } from "../redux/feature/tourSlice"

const initialState = {
  title: "",
  description: "",
  tags: [],
}

function AddEditTour() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useSelector((state) => ({ ...state.auth }))
  const { userTours } = useSelector((state) => ({ ...state.tour }))
  const [tourData, setTourData] = useState(initialState)
  const [tagErrorMsg, setTagErrorMsg] = useState(null)
  const { title, description, tags } = tourData

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id)
      console.log(singleTour)
      setTourData({ ...singleTour })
    }
  }, [id, userTours])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTourData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!tags.length) {
      setTagErrorMsg("Please provide some tags")
    }
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name }

      if (!id) {
        dispatch(createTour({ tourData: updatedTourData, navigate, toast }))
      } else {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }))
      }

      handleClear()
    }
  }
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] })
    setTagErrorMsg(null)
  }

  const handleAddTag = (tag) => {
    setTagErrorMsg(null)
    setTourData((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
  }
  const handleDeleteTag = (deleteTag) => {
    setTourData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== deleteTag),
    }))
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
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Tour" : "Add Tour"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                type="text"
                placeholder="Enter title"
                value={title}
                name="title"
                onChange={handleInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                type="text"
                placeholder="Enter description"
                textarea
                rows={4}
                value={description}
                name="description"
                onChange={handleInputChange}
                className="form-control"
                required
                invalid="true"
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter tags"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrorMsg && <div className="tagErrMsg">{tagErrorMsg}</div>}
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default AddEditTour
