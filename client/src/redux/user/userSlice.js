import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        setOverallProgress: (state, action) => {
            state.overallProgress = action.payload;
        },
        

    }
})

export const {signInSuccess, setOverallProgress} = userSlice.actions;
export default userSlice.reducer;