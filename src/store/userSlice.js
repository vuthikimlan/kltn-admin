import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        updateUser: {},
    },
    reducers: {
        updateUser: (state, actions) => {
            state.updateUser = actions.payload
        },
        
    }
});

export const {updateUser, } = userSlice.actions

export default userSlice.reducer;