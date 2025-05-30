

'use client';


import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/store/counterSlice';
import type {RootState, AppDispatch} from '@/store/store';
import App from 'next/app';

const CounterPage: React.FC = () => {

    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      
    }}>
      <h1>Contador con Redux</h1>
      <p style={{ fontSize: '3em', margin: '20px 0' }}>{count}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => dispatch(increment())}
          style={{ padding: '10px 20px', fontSize: '1.2em', cursor: 'pointer' }}
        >
          Incrementar
        </button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ padding: '10px 20px', fontSize: '1.2em', cursor: 'pointer' }}
        >
          Decrementar
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          style={{ padding: '10px 20px', fontSize: '1.2em', cursor: 'pointer' }}
        >
          Incrementar en 5
        </button>
      </div>
    </div>
  );
};

export default CounterPage;
