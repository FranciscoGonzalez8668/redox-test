// src/components/ChatbotWidget.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react'; // Importa useState y useEffect
import ChatCore from '@/components/chatCore'; // La ruta a ChatCore desde src/components/ChatbotWidget.tsx

// Este componente ya no recibe props 'isOpen' o 'onClose'
// ya que gestiona su propio estado de visibilidad.
const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado interno para controlar la visibilidad

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 2000,
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end', // Alinea el botón a la derecha si está abierto
    }}>
      {isOpen && (
        <div style={{
          width: '350px',
          height: '450px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #eee',
          marginBottom: '10px', // Espacio entre el widget y el botón
        }}>
          {/* Encabezado del widget */}
          <div style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 15px',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '1.1em',
            fontWeight: 'bold',
          }}>
            <span>Chat con Bot</span>
            <button
              onClick={toggleChatbot} // Usa el toggle para cerrar
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5em',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              &times; {/* Símbolo de "x" para cerrar */}
            </button>
          </div>

          <ChatCore /> {/* Renderiza el componente central del chat aquí */}
        </div>
      )}

      {/* Botón de apertura/cierre del chatbot */}
      <button
        onClick={toggleChatbot}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%', // Forma redonda
          width: '60px',       // Tamaño del botón
          height: '60px',
          fontSize: '2.5em',    // Tamaño del icono
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          transition: 'background-color 0.2s ease-in-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')} // Efecto hover
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')} // Quitar hover
        title={isOpen ? 'Cerrar Chatbot' : 'Abrir Chatbot'}
      >
        {isOpen ? '—' : '💬'} {/* Cambia el icono si está abierto o cerrado */}
      </button>
    </div>
  );
};

export default ChatbotWidget;