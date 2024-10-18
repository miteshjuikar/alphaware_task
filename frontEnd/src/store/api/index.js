import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  jobs: [],
};

export const addNewJob = createAsyncThunk(
    "/admin/form",
    async (formData) => {
      const result = await axios.post(
        "http://localhost:8000/api/admin/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );
  
  export const fetchAllJobs = createAsyncThunk(
    "/admin/listing",
    async () => {
      const result = await axios.get(
        "http://localhost:8000/api/list/get",
      );
      return result?.data;
    }
  );
  

  const jobSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {      
        builder      
        .addCase(fetchAllJobs.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchAllJobs.fulfilled, (state, action) => {
          state.isLoading = false;
          state.jobs = action.payload.data;
        })
        .addCase(fetchAllJobs.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
        });
    },
});

export default jobSlice.reducer;

