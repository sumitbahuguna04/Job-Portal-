import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "Company",
  initialState: {
    singleCompany: null,
    companies: [],
    seachbycompany: null,
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchbycompany: (state, action) => {
      state.seachbycompany = action.payload;
    },
  },
});

export const {setSearchbycompany, setSingleCompany, setCompanies } = companySlice.actions;
export default companySlice.reducer;
