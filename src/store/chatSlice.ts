import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { buildCreateApi } from '@reduxjs/toolkit/query';
import { act } from 'react';

interface Message{
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: number;
}

interface chatState {
    messages: Message[];
    isBotTyping: boolean;
    error: string | null;
}

const initialState: chatState = {
    messages: [],
    isBotTyping: false,
    error: null,
};

export const sendMessage = createAsyncThunk<Message, string, {state:{chatSlice:chatState}}>(
    'chat/sendMessage',
    async (userMessageText: string, {dispatch,getState})=>{
        const userMessage: Message={
            id:Date.now().toString() +'-user',
            text: userMessageText,
            sender: 'user',
            timestamp: Date.now(),
        };
        dispatch(chatSlice.actions.addMessage(userMessage));

        dispatch(chatSlice.actions.setBotTyping(true));

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate bot response delay

        let botResponseText = 'Lo siento, no entendí eso.';
        
        const lowerCaseMessage = userMessageText.toLocaleLowerCase();
        if (lowerCaseMessage.includes('hola')) {
            botResponseText = '¡Hola! ¿Cómo puedo ayudarte hoy?';
        } else if (lowerCaseMessage.includes('adiós')) {
            botResponseText = '¡Adiós! Que tengas un buen día.';
        } else if (lowerCaseMessage.includes('gracias')) {
            botResponseText = '¡De nada! Estoy aquí para ayudar.';
        }else if (lowerCaseMessage.includes('matate')) {
            botResponseText = 'Morite vos hijo de puta'
        }

        const botMessage: Message = {
            id: Date.now().toString() + '-bot',
            text: botResponseText,
            sender: 'assistant',
            timestamp: Date.now(),
        };

        dispatch(chatSlice.actions.setBotTyping(false));

        return botMessage;
    }
);

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{

        addMessage: (state,action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setBotTyping: (state, action: PayloadAction<boolean>) => {
            state.isBotTyping = action.payload;
        },
        clearChat(state){
            state.messages = [];
            state.isBotTyping = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendMessage.pending, (state) => {
            state.error= null;
        })
        .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
            state.error = null;
        })
        .addCase(sendMessage.rejected, (state, action) => {
            state.error = action.error.message || 'Error al enviar el mensaje';
            state.isBotTyping = false;
        });
    }
});

export const {addMessage, setBotTyping, clearChat} = chatSlice.actions;

export default chatSlice.reducer;