import {configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';
import postReducer from './postsSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todoReducer,
        postsSlice: postReducer, // Use the reducer from postsSlice  
        chatSlice: chatReducer, // Use the reducer from chatSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;