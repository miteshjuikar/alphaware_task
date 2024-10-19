import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../component/common/config";

const backEndURL = config.backEndURL;

const initialState = {
  isLoading: false,
  jobs: [],
};

export const addNewJob = createAsyncThunk(
    "/admin/form",
    async (formData) => {
      const result = await axios.post(
        `${backEndURL}/api/admin/add`,
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
         `${backEndURL}/api/list/get`,
      );
      return result?.data;
    }
  );
  

  const jobSlice = createSlice({
    name: 'jobs',
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

