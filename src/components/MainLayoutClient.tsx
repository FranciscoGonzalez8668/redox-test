// src/components/MainLayoutClient.tsx

'use client'; // ¡Es crucial!

import React from 'react'; // Ya no necesitamos useState aquí
import Header from '@/components/header'; // La ruta a tu Header
import ChatbotWidget from '@/components/chatbotWidget'; // La ruta a tu ChatbotWidget
import { Providers } from '@/components/providers'; // La ruta a tu Providers
import Footer from './footer';

interface MainLayoutClientProps {
  children: React.ReactNode;
}

const MainLayoutClient: React.FC<MainLayoutClientProps> = ({ children }) => {
  // El estado 'isChatbotOpen' ya no se gestiona aquí, lo gestiona ChatbotWidget internamente.

  return (
    <>
      <Header /> {/* El Header ya no necesita props del chatbot */}
      <div style={{
        paddingTop: '100px', // Ajusta el padding para evitar que el contenido se superponga al header
      }}>
      <Providers>
        {children}
      <ChatbotWidget /> {/* Renderiza el ChatbotWidget sin props de visibilidad */}
      </Providers>
      <Footer/>
      </div>
    </>
  );
};

export default MainLayoutClient;