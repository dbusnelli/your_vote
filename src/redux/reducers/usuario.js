import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usuario: null
}

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        setUsuario: (state, action) => {
            const usuarioPayload = action.payload;
            state.usuario = usuarioPayload;
        }
    }
})

export const {setUsuario} = usuarioSlice.actions;
export default usuarioSlice.reducer;