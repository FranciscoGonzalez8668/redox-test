// src/components/ChatCore.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, clearChat, setIsBotTyping, setConversationContext, startBotConversation } from '../store/chatSlice';
import type { RootState, AppDispatch } from '../store/store';
import type { Message } from '../store/chatSlice';

const ChatCore: React.FC = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const messages = useSelector((state: RootState) => state.chatSlice.messages);
  const isBotTyping = useSelector((state: RootState) => state.chatSlice.isBotTyping);
  const error = useSelector((state: RootState) => state.chatSlice.error);
  const conversationContext = useSelector((state: RootState) => state.chatSlice.conversationContext);
  const dispatch = useDispatch<AppDispatch>();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Efecto para hacer scroll al final.
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isBotTyping]);

  // Efecto para iniciar la conversación del bot si no hay mensajes
  // Se ejecuta una sola vez al montar el componente para asegurar el saludo inicial
  useEffect(() => {
    if (messages.length === 0) { // Si el estado inicial de mensajes está vacío
      dispatch(clearChat()); // Esto ahora también añade el mensaje de bienvenida
    }
  }, [dispatch, messages.length]); // Dependencia messages.length para asegurar que se dispara si se vacía

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessageText = messageInput.trim();
    if (userMessageText === '') return;
    // Si el bot está escribiendo, no permitir enviar otro mensaje
    if (isBotTyping) return;

    // Añadir el mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMessageText,
      timestamp: Date.now(),
    };
    dispatch(addMessage(userMessage));
    setMessageInput('');

    dispatch(setIsBotTyping(true)); // Bot está pensando/escribiendo

    setTimeout(() => {
      let botResponseText = '';
      let newContext = conversationContext;

      // Normalizamos la entrada del usuario a minúsculas y sin espacios extra para facilitar la comparación
      const normalizedUserMessage = userMessageText.toLowerCase().trim();

      switch (conversationContext) {
        case 'initial':
          switch (normalizedUserMessage) {
            case '1':
              botResponseText = 'Has elegido "Sacar un turno". Por favor, indícame qué especialidad necesitas (ej. "Pediatría", "Cardiología", "Clínica Médica").';
              newContext = 'sacar_turno';
              break;
            case '2':
              botResponseText = 'Has elegido "Consultar un turno". Por favor, ingresa tu DNI y la fecha del turno (ej. "DNI: 12345678 Fecha: 15/07/2025").';
              newContext = 'consultar_turno';
              break;
            case '3':
              botResponseText = 'Has elegido "Ver horarios de atención". Nuestros horarios generales de atención son de Lunes a Viernes de 8:00 a 20:00 hs. Para urgencias, estamos disponibles 24/7.';
              newContext = 'initial'; // Vuelve al menú principal después de dar la info
              break;
            case 'menú': // Permitir "menú" en el contexto inicial también
            case 'menu':
              botResponseText = 'Ya estás en el menú principal. ¿En qué más puedo ayudarte?\n\n1. Sacar un turno\n2. Consultar un turno\n3. Ver horarios de atención';
              newContext = 'initial';
              break;
            default:
              botResponseText = 'Opción no válida. Por favor, elige 1, 2 o 3. Si quieres volver al menú principal, escribe "menú".';
              newContext = 'initial'; // Se mantiene en el contexto inicial
              break;
          }
          break;

        case 'sacar_turno':
          if (normalizedUserMessage === 'menú' || normalizedUserMessage === 'menu') {
             botResponseText = 'Volviendo al menú principal. ¿En qué más puedo ayudarte?\n\n1. Sacar un turno\n2. Consultar un turno\n3. Ver horarios de atención';
             newContext = 'initial';
          } else if (userMessageText.length > 3) { // Simula que el usuario escribió una especialidad
              botResponseText = `Entendido. Para "${userMessageText}", te derivaremos con un agente para coordinar el turno. Por favor, espera en línea.`;
              newContext = 'initial'; // Después de derivar, vuelve al contexto inicial
          } else {
              botResponseText = 'No he entendido la especialidad. Por favor, indícame la especialidad o escribe "menú" para volver al inicio.';
              newContext = 'sacar_turno'; // Se mantiene en el contexto de sacar turno
          }
          break;

        case 'consultar_turno':
          if (normalizedUserMessage === 'menú' || normalizedUserMessage === 'menu') {
             botResponseText = 'Volviendo al menú principal. ¿En qué más puedo ayudarte?\n\n1. Sacar un turno\n2. Consultar un turno\n3. Ver horarios de atención';
             newContext = 'initial';
          } else if (normalizedUserMessage.includes('dni:') && normalizedUserMessage.includes('fecha:')) { // Simula una entrada de DNI y Fecha
              botResponseText = 'Consultando tu turno... Sí, encontramos un turno para el DNI y fecha proporcionados. Te hemos enviado los detalles a tu email registrado.';
              newContext = 'initial';
          } else {
              botResponseText = 'Formato incorrecto. Por favor, ingresa tu DNI y la fecha del turno (ej. "DNI: 12345678 Fecha: 15/07/2025") o escribe "menú".';
              newContext = 'consultar_turno';
          }
          break;

        case 'ver_horarios': // Este caso no debería necesitar lógica adicional si siempre vuelve a 'initial'
                            // pero se mantiene para claridad si se expandiera.
          if (normalizedUserMessage === 'menú' || normalizedUserMessage === 'menu') {
             botResponseText = 'Volviendo al menú principal. ¿En qué más puedo ayudarte?\n\n1. Sacar un turno\n2. Consultar un turno\n3. Ver horarios de atención';
             newContext = 'initial';
          } else {
             botResponseText = 'Ya te he dado los horarios de atención. ¿Necesitas algo más? Puedes elegir una opción o escribir "menú".\n\n1. Sacar un turno\n2. Consultar un turno\n3. Ver horarios de atención';
             newContext = 'initial';
          }
          break;

        default:
          botResponseText = 'Lo siento, ha ocurrido un error o no entiendo el contexto. Por favor, escribe "menú" para empezar de nuevo.';
          newContext = 'initial';
          break;
      }

      // Añadir la respuesta del bot
      const botMessage: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        text: botResponseText,
        timestamp: Date.now(),
      };
      dispatch(addMessage(botMessage));
      dispatch(setConversationContext(newContext));
      dispatch(setIsBotTyping(false)); // Bot deja de escribir
    }, 1500); // Retraso para simular la "respuesta" del bot
  };

  const handleClearChat = () => {
    dispatch(clearChat()); // Ahora clearChat también reinicia la conversación
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      padding: '10px',
      overflowY: 'auto',
      backgroundColor: '#f0f2f5',
      borderRadius: '8px',
      color: '#333',
    }}>
      {/* Área de mensajes */}
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '10px',
      }}>
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
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
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
          placeholder="Escribe tu mensaje o la opción..."
          style={{
            flexGrow: 1,
            padding: '8px',
            fontSize: '0.9em',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
          disabled={isBotTyping} //Habilita/deshabilita el input según si el bot está escribiendo 
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