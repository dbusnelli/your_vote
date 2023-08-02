import { configureStore } from '@reduxjs/toolkit';
import votacionesReducer from './reducers/votaciones';

export default configureStore({
  reducer: {
      votaciones: votacionesReducer
  }
})