import {createSlice,  createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

interface Post{
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface PostsState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


const initialState: PostsState = {
    posts: [],
    status: 'idle',
    error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
    'posts/fetchPosts',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('No se pudieron obtener los posts');
        }
        const data: Post[] = await response.json();
        return data;
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected,(state,action)=> {
                state.status = 'failed';
                state.error = action.error.message || 'Error al cargar los posts';
                state.posts = [];
            });
    },
});

export default postsSlice.reducer;
