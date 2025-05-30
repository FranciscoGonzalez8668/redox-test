// src/components/ChatCore.tsx

'use client'; // ¡Es crucial! Este componente utiliza hooks de React y Redux

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Asegúrate de que las rutas a tu store sean correctas desde src/components/ChatCore.tsx
// Si tu store está en src/store, la ruta relativa sería '../store/chatSlice' y '../store/store'
import { sendMessage, clearChat } from '../store/chatSlice';
import type { RootState, AppDispatch } from '../store/store';

interface ChatCoreProps {
  // Este componente es la "lógica" del chat, no gestiona si es visible o no.
  // Puedes añadir props aquí si quieres personalizar su comportamiento interno (ej. hideClearButton)
}

const ChatCore: React.FC<ChatCoreProps> = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const messages = useSelector((state: RootState) => state.chatSlice.messages);
  const isBotTyping = useSelector((state: RootState) => state.chatSlice.isBotTyping);
  const error = useSelector((state: RootState) => state.chatSlice.error);
  const dispatch = useDispatch<AppDispatch>();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Efecto para hacer scroll al final de la conversación
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isBotTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() !== '') {
      dispatch(sendMessage(messageInput.trim()));
      setMessageInput('');
    }
  };

  const handleClearChat = () => {
    dispatch(clearChat());
  };

  return (
    <div style={{ // Estilos para la estructura interna del chat, no para su posición en la página
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1, // Para que ocupe el espacio disponible en su contenedor
      padding: '10px',
      overflowY: 'auto',
      backgroundColor: '#f0f2f5',
      borderRadius: '8px', // Le damos un poco de borde para que se vea bien en ambos contextos
      // border: '1px solid #ccc', // Puedes añadir un borde aquí si quieres que se vea en el widget y en la página
    }}>
      {/* Área de mensajes */}
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '10px',
      }}>
        {messages.length === 0 && !isBotTyping && (
          <p style={{ textAlign: 'center', color: '#666', margin: 'auto' }}>¡Hola! ¿En qué puedo ayudarte?</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#e0e0e0',
              borderRadius: '10px',
              padding: '8px 12px',
              margin: '5px 0',
              maxWidth: '70%',
              wordWrap: 'break-word',
            }}
          >
            <strong>{msg.sender === 'user' ? 'Tú' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
        {isBotTyping && (
          <div style={{
            alignSelf: 'flex-start',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            padding: '8px 12px',
            margin: '5px 0',
            maxWidth: '70%',
            opacity: 0.7,
            fontStyle: 'italic',
          }}>
            Bot está escribiendo...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de error */}
      {error && <p style={{ color: 'red', marginTop: '5px', padding: '0 10px' }}>{error}</p>}

      {/* Formulario de envío de mensaje */}
      <form onSubmit={handleSendMessage} style={{
        display: 'flex',
        paddingTop: '10px',
        borderTop: '1px solid #eee',
        gap: '5px'
      }}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{
            flexGrow: 1,
            padding: '8px',
            fontSize: '0.9em',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
          disabled={isBotTyping}
        />
        <button
          type="submit"
          style={{
            padding: '8px 12px',
            fontSize: '0.9em',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            opacity: isBotTyping ? 0.7 : 1,
          }}
          disabled={isBotTyping}
        >
          Enviar
        </button>
        <button
          type="button"
          onClick={handleClearChat}
          style={{
            padding: '8px 10px',
            fontSize: '0.9em',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: '#f44336',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Limpiar
        </button>
      </form>
    </div>
  );
};

export default ChatCore;