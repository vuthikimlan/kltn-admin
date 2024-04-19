import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
    name: 'course',
    initialState: {
        updateCourse: {}
    },
    reducers: {
        updateCourse: (state, actions) => {
            state.updateCourse = actions.payload
        }
    }
})

export const {updateCourse,} = courseSlice.actions

export default courseSlice.reducer