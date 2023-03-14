import {configureStore} from '@reduxjs/toolkit';
import board from './slices/board';

const store = configureStore({
    reducer: {
        board,
    }
})

export default store;
