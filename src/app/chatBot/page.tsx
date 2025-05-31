'use client';


import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import sendMessage, { clearChat } from "@/store/chatSlice";
import type { RootState, AppDispatch } from "@/store/store";

// Create a typed dispatch hook to handle thunk actions correctly
const useAppDispatch = () => useDispatch<AppDispatch>();


const ChatPage: React.FC = ()=>{
    const [messageInput, setMessageInput] = useState<string>('');
    const messages = useSelector((state: RootState) => state.chatSlice.messages);
    const isBotTyping = useSelector((state: RootState) => state.chatSlice.isBotTyping);
    const error = useSelector((state: RootState) => state.chatSlice.error);
    const dispatch = useAppDispatch();
    
    const messageEndRef = useRef<HTMLDivElement>(null);    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages, isBotTyping]);const handleSendMessage = (e: React.FormEvent)=>{
        e.preventDefault();
        if (messageInput.trim() !== '') {
            void dispatch(sendMessage(messageInput.trim())); // Dispatch the thunk and ignore Promise
            setMessageInput(''); // Clear input
        }
    };    const handleClearChat = ()=>{
        dispatch(clearChat());
    };


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            boxSizing: 'border-box',
        }}>
            <h1 style={{ color: 'white' }}>Simple ChatBot</h1>            
            <div style={{
                width: '100%',
                maxWidth: '600px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                maxHeight: '400px', // Altura fija para forzar el scroll
                height: '500px', // Altura fija para mantener el tamaño consistente
            }}>
                {/*Mensajes*/}
                {messages.length === 0 && !isBotTyping && (
                    <p style={{textAlign: 'center', color: 'black'}}> Empieza la conversacion con el Chat Bot</p>
                )}
                {messages.map((msg)=>
                <div key={msg.id}
                style = {{alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    margin: '5px',
                    maxWidth: '70%',
                    wordWrap: 'break-word',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    color: '#333',
                }}
                >
                <strong>{msg.sender==='user'? 'Tú' : 'Bot'}:</strong>{msg.text}
                </div>
                )}
                {/* Indicador de "Bot está escribiendo" */}
                {isBotTyping && (
                    <div style={{
                        alignSelf: 'flex-start',
                        backgroundColor: '#e2e3e5',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        margin: '5px',
                        maxWidth: '70%',
                        wordWrap: 'break-word',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        fontSize: '16px',
                        color: '#333',

                    }}>
                        <strong>Bot:</strong> Está escribiendo...
                    </div>
                )}                {/* Referencia para el final de los mensajes */}
                <div ref={messageEndRef} style={{ height: '1px', float: 'left', clear: 'both' }}></div>
        </div>
        
        {/* Área de error*/}
        {error && (
            <div style={{
                color: 'red',
                marginTop: '10px',
                textAlign: 'center',
            }}>
                Error: {error}
            </div>
        )}

        {/*Formulario de entrada de mensajes*/}
        <form onSubmit={handleSendMessage} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
            marginTop: '20px',
            boxSizing: 'border-box'
        }}>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginBottom: '10px',
                    boxSizing: 'border-box',
                    fontSize: '16px',
                    color: '#333',
                    backgroundColor: '#f8f9fa',
                }}
            />
            <button type="submit" style={{
                padding: '10px 15px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#007bff',
                color: '#fff',
                cursor: 'pointer',
            }}>Enviar</button>
            <button type="button" onClick={handleClearChat} style={{
                padding: '10px 15px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#dc3545',
                color: '#fff',
                cursor: 'pointer',
                marginTop: '10px',
            }}>Limpiar Chat</button>
        </form>
        </div>
    )

}

export default ChatPage;