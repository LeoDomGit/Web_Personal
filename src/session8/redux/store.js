import { configureStore } from "@reduxjs/toolkit";
import xucxacReducer from "./slices/xucxacSlices";

export const store = configureStore({
    reducer :{
        xucxac : xucxacReducer
    }
})