// src/store/chatSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
}

type ConversationContext = 'initial' | 'sacar_turno' | 'consultar_turno' | 'ver_horarios';

interface ChatState {
  messages: Message[];
  isBotTyping: boolean;
  error: string | null;
  conversationContext: ConversationContext;
}

const initialState: ChatState = {
  messages: [],
  isBotTyping: false,
  error: null,
  conversationContext: 'initial',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setIsBotTyping: (state, action: PayloadAction<boolean>) => {
      state.isBotTyping = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.isBotTyping = false;
      state.error = null;
      state.conversationContext = 'initial';
      // Después de limpiar, el bot debe reiniciar la conversación
      // Agregamos el mensaje de bienvenida aquí para que siempre esté al inicio
      state.messages.push({
        id: Date.now().toString() + '_welcome', // ID único para el mensaje de bienvenida
        sender: 'bot',
        text: '¡Hola! Bienvenido al chat del Hospital Central. ¿En qué puedo ayudarte hoy?\n\n',
        timestamp: Date.now(),
      });
      state.messages.push({
        id: Date.now().toString() + '_bot_typing', // ID único para el mensaje de "escribiendo"
        sender: 'bot',
        text: '1. Sacar un turno\n2. Consultar un turno\n3. Ver horarios de atención.', // Este mensaje se usa para simular que el bot está escribiendo
        timestamp: Date.now(),
      });
    },
    setConversationContext: (state, action: PayloadAction<ConversationContext>) => {
      state.conversationContext = action.payload;
    },
    // startBotConversation se puede simplificar o eliminar si el mensaje se añade en clearChat
    // Si quieres que solo se dispare al inicio y no al limpiar, lo mantenemos así:
    startBotConversation: (state) => {
      if (state.messages.length === 0) { // Solo si no hay mensajes
        state.isBotTyping = true;
        // Usamos un setTimeout aquí para simular la escritura,
        // pero el mensaje se añade directamente después en ChatCore para mayor control
      }
    },
  },
});

export const { addMessage, setIsBotTyping, setError, clearChat, setConversationContext, startBotConversation } = chatSlice.actions;

export default chatSlice.reducer;