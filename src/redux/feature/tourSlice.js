import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

export const createTour = createAsyncThunk(
  "auth/createTour",
  async ({ tourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(tourData)
      toast.success("Tour added successfully")
      navigate("/")
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error.response.data)
    }
  }
)
export const getTours = createAsyncThunk(
  "auth/getTours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTours()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const getTour = createAsyncThunk(
  "auth/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteTour = createAsyncThunk(
  "auth/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id)
      toast.success("Tour deleted successfully")
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const updateTour = createAsyncThunk(
  "auth/updateTour",
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id)
      toast.success("Tour updated successfully")
      navigate("/")
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const getToursByUser = createAsyncThunk(
  "auth/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const searchTours = createAsyncThunk(
  "auth/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(searchQuery)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTagTours = createAsyncThunk(
  "auth/getTagTours",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getToursByTag(tag)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const getRelatedTours = createAsyncThunk(
  "auth/getRelatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTours(tags)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [], // logged in users
    tagTours: [],
    relatedTours: [],
    loading: false,
    error: "",
  },
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false

      state.tours = [action.payload]
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getTours.pending]: (state, action) => {
      state.loading = true
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false
      state.tours = action.payload
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getTour.pending]: (state, action) => {
      state.loading = true
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false
      state.tour = action.payload
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getToursByUser.pending]: (state, action) => {
      state.loading = true
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false
      state.userTours = action.payload
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deleteTour.pending]: (state, action) => {
      state.loading = true
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false
      const { arg } = action.meta
      if (arg) {
        state.userTours = state.userTours.filter((tour) => tour._id !== arg.id)
        state.tours = state.tours.filter((tour) => tour._id !== arg.id)
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [updateTour.pending]: (state, action) => {
      state.loading = true
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false
      console.log("delete fullfilled: ", action)
      const { arg } = action.meta
      if (arg) {
        state.userTours = state.userTours.map((tour) =>
          tour._id === arg.id ? action.payload : tour
        )
        state.tours = state.tours.filter((tour) =>
          tour._id === arg.id ? action.payload : tour
        )
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [searchTours.pending]: (state, action) => {
      state.loading = true
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false
      state.tours = action.payload
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getTagTours.pending]: (state, action) => {
      state.loading = true
    },
    [getTagTours.fulfilled]: (state, action) => {
      state.loading = false
      state.tagTours = action.payload
    },
    [getTagTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getRelatedTours.pending]: (state, action) => {
      state.loading = true
    },
    [getRelatedTours.fulfilled]: (state, action) => {
      state.loading = false
      state.relatedTours = action.payload
    },
    [getRelatedTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default tourSlice.reducer
