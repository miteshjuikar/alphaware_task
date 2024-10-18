import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import jobSlice from './api/index'

const store = configureStore({
    reducer: {
        auth: authReducer,
        jobDetails: jobSlice,
    }
});

export default store;

