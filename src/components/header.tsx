// src/components/Header.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Header ya no recibe props relacionadas con el chatbot
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: '#282c34',
      color: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      {/* Lado Izquierdo: Menú Desplegable */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
          }}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
        >
          ☰ {/* Icono de hamburguesa */}
        </button>
        {isMenuOpen && (
          <nav
            id="main-menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: 0,
              backgroundColor: '#3a3f47',
              borderRadius: '5px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              minWidth: '180px',
              zIndex: 1001,
              padding: '10px 0',
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '8px 15px', borderBottom: '1px solid #4a4f57' }}
                onMouseEnter={() => setHoveredLink('home')} onMouseLeave={() => setHoveredLink(null)}>
                <Link href="/" onClick={toggleMenu} style={{ color: hoveredLink === 'home' ? '#61dafb' : 'white', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease-in-out' }}>
                  Inicio
                </Link>
              </li>
              <li style={{ padding: '8px 15px', borderBottom: '1px solid #4a4f57' }}
                onMouseEnter={() => setHoveredLink('todos')} onMouseLeave={() => setHoveredLink(null)}>
                <Link href="/todos" onClick={toggleMenu} style={{ color: hoveredLink === 'todos' ? '#61dafb' : 'white', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease-in-out' }}>
                  Lista de Tareas
                </Link>
              </li>
              <li style={{ padding: '8px 15px', borderBottom: '1px solid #4a4f57' }}
                onMouseEnter={() => setHoveredLink('posts')} onMouseLeave={() => setHoveredLink(null)}>
                <Link href="/posts" onClick={toggleMenu} style={{ color: hoveredLink === 'posts' ? '#61dafb' : 'white', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease-in-out' }}>
                  Posts
                </Link>
              </li>
              <li style={{ padding: '8px 15px' }}
                onMouseEnter={() => setHoveredLink('chat')} onMouseLeave={() => setHoveredLink(null)}>
                <Link href="/chatBot" onClick={toggleMenu} style={{ color: hoveredLink === 'chat' ? '#61dafb' : 'white', textDecoration: 'none', display: 'block', transition: 'color 0.2s ease-in-out' }}>
                  Chatbot (Página)
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Centro: Imagen/Logo */}
      <div style={{ flexGrow: 1, textAlign: 'center' }}>
        <h2 style={{ margin: 0, color: '#61dafb' }}>Mi App Redux</h2>
      </div>

      {/* Lado Derecho: SOLO Icono de Iniciar Sesión */}
      <div>
        <button
          onClick={() => alert('Iniciar Sesión / Perfil de Usuario')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2em',
            cursor: 'pointer',
            padding: '5px',
          }}
          title="Iniciar Sesión"
        >
          👤 {/* Icono de usuario */}
        </button>
      </div>
    </header>
  );
};

export default Header;