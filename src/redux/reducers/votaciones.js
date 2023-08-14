import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    votaciones: [],
    votacionActual: null,
    items_votaciones: []
}

export const votacionesSlice = createSlice({
    name: "votaciones",
    initialState,
    reducers: {
        modifyVotaciones: (state, action) => {
            const votacionesPayload = action.payload;
            state.votaciones = votacionesPayload;
        },
        modifyItemsVotaciones: (state, action) => {
            const itemsPayload = action.payload;
            state.items_votaciones = itemsPayload;
        },
        setVotacionActual: (state, action) => {
            const votacionPayload = action.payload;
            state.votacionActual = votacionPayload;
        },
    }
})

export const {modifyVotaciones} = votacionesSlice.actions;
export const {modifyItemsVotaciones} = votacionesSlice.actions;
export const {setVotacionActual} = votacionesSlice.actions;
export default votacionesSlice.reducer;