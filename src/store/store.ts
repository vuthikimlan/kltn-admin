import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './modalSlice'
import userReducer from "./userSlice";
import courseReducer from './courseSlice';


export const store = configureStore({
    reducer:{
        modal: modalReducer,
        user: userReducer,
        course: courseReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
