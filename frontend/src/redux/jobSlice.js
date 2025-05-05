import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    searchJob: "",
    savedJobsArray: [],
    searchedjobArray: [],
  },
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSearchJob: (state, action) => {
      state.searchJob = action.payload;
    },
    SetSavedJobsArray: (state, action) => {
      state.savedJobsArray = action.payload;
    },
    SetSeachedJobsArray: (state, action) => {
      state.searchedjobArray = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setSearchJob,
  SetSavedJobsArray,
  SetSeachedJobsArray,
} = jobSlice.actions;
export default jobSlice.reducer;
