import { configureStore } from '@reduxjs/toolkit';
import votacionesReducer from './reducers/votaciones';
import usuarioReducer from './reducers/usuario';

export default configureStore({
  reducer: {
      votaciones: votacionesReducer,
      usuario: usuarioReducer
  }
})