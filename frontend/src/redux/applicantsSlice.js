import { createSlice } from "@reduxjs/toolkit";

const applicantsSlice = createSlice({
  name: "applicant",
  initialState: {
   
    allapplicants: {},
  },
  reducers: {
    setApplicants: (state, action) => {
      state.allapplicants = action.payload;
    },
  },
});

export const {  setApplicants } = applicantsSlice.actions;
export default applicantsSlice.reducer;
