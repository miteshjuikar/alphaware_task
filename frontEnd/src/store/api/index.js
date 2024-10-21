import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../component/common/config";

const backEndURL = config.backEndURL;

const initialState = {
  isLoading: false,
  jobs: [],
  appliedJobs: [],
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
      `${backEndURL}/api/list/get`
    );
    return result?.data;
  }
);

export const applyForJob = createAsyncThunk(
  "jobs/applyForJob",
  async (jobId) => {
    const result = await axios.post(
      `${backEndURL}/api/apply/${jobId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      }
    );     
    return result?.data;
  }
);

export const fetchAppliedJobs = createAsyncThunk(
  "jobs/fetchAppliedJobs",
  async () => {
    const result = await axios.get(
      `${backEndURL}/api/apply/getAppliedJob`,
      {
        withCredentials: true 
      }
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
      .addCase(fetchAllJobs.rejected, (state) => {
        state.isLoading = false;
        state.jobs = [];
      })
      .addCase(applyForJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(applyForJob.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appliedJobs = action.payload.data;
      })
      .addCase(fetchAppliedJobs.rejected, (state) => {
        state.isLoading = false;
        state.appliedJobs = [];
      });
  },
});

export default jobSlice.reducer;
