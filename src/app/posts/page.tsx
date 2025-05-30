
'use client';

import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '@/store/postsSlice';
import type { RootState, AppDispatch } from '@/store/store';
import { StringXor } from 'next/dist/compiled/webpack/webpack';



const PostPage: React.FC = () => {
    const post = useSelector((state: RootState) => state.postsSlice.posts);
    const postStatus = useSelector((state: RootState) => state.postsSlice.status);
    const error = useSelector((state: RootState) => state.postsSlice.error);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    let content;

    if(postStatus === 'loading') {
        content = <p>Loading...</p>;
    }else if (postStatus==='succeeded'){

        content =(
            <ul style={{ listStyle: 'none', padding: 0, width: '100%', maxWidth: '600px' }}>
            {post.map((post) => (
            <li
                key={post.id}
                style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9',
                }}
            >
                <h3 style={{ margin: '0 0 10px', color: '#333' }}>{post.title}</h3>
                <p style={{ margin: 0, color: '#666' }}>{post.body}</p>
            </li>
            ))}
        </ul>
        )

    } else if (postStatus === 'failed') {
        content = <p>Error: {error}</p>;
    }

    return (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1><strong>Posts</strong></h1>
            {content}
        </div>
    );

}

export default PostPage;