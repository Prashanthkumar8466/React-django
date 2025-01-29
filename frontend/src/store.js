import { configureStore } from '@reduxjs/toolkit';
import Productreducer from './redux/reducers/Productreducer';

const store = configureStore({
  reducer: {
    products: Productreducer,
  },
});

export default store;
