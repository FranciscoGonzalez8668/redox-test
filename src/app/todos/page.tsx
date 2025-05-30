

'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo } from '@/store/todoSlice';
import type { RootState, AppDispatch } from '@/store/store';


const TodosPage: React.FC = () => {  

    const [newTodoText, setNewTodoText] = React.useState<string>('');

    const todos = useSelector((state: RootState) => state.todos.todos);

    const dispatch = useDispatch<AppDispatch>();

    const handleAddTodo = (e: React.FormEvent)=>{
        
        e.preventDefault();
        if (newTodoText.trim() !== ''){ 
        dispatch(addTodo(newTodoText.trim()));
        setNewTodoText('');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1>Lista de Tareas con Redux</h1>
            <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    placeholder="Nueva tarea"
                    style={{ padding: '10px', fontSize: '1em', width: '300px' }}
                />
                <button
                    type="submit"
                    style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer' }}
                >
                    Agregar Tarea
                </button>
            </form>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ marginBottom: '10px' }}>
                        {todo.text}
                        <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )


}

export default TodosPage;
