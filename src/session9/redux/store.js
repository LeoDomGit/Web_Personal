import { configureStore } from "@reduxjs/toolkit";

import xucxacReducer from "../../session8/redux/slices/xucxacSlices";

export const store = configureStore({
    reducer: {

        xucxac: xucxacReducer,
    }
})