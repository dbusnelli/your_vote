import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    votaciones: [],
    items_votaciones: []
}

export const votacionesSlice = createSlice({
    name: "votaciones",
    initialState,
    reducers: {
        modifyVotaciones: (state, action) => {
            const votacionesPayload = action.payload;
            state.votaciones = votacionesPayload;
        }
    }
})

export const {modifyVotaciones} = votacionesSlice.actions;
export default votacionesSlice.reducer;