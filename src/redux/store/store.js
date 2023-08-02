import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/votaciones';

export default configureStore({
  reducer: {
      votaciones: userReducer
  }
})