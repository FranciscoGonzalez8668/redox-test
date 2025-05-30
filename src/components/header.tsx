

'use client';

import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {


    
    console.log("Header component rendering");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
    
        setLastScrollY(window.scrollY);
        const controlHeader = () => {
            const currentScrollY = window.scrollY;

            //Make header visible when scrolling up
            if(currentScrollY < lastScrollY) {
                setScrollDirection('up');
                setVisible(true);
            }
            else 
            //Hide header when scrolling down
            {
                setScrollDirection('down');
                setVisible(false);
            }

            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', controlHeader);
        

        return ()=>{
            window.removeEventListener('scroll', controlHeader);
        };

    }, [lastScrollY])

    return(
        <header style = {{
            display : 'flex',
            justifyContent : 'space-between',
            alignItems: 'center',
            padding: '15px 20px',
            backgroundColor: '#282c34',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            top: visible ? '0' : '-150px',
            zIndex: 1000,
            marginBottom: 'auto',
            transition: 'top 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            left: 0,
            right: 0,
            width: '100%',
    
        }}>
            {/* Lado Izquierdo: Menu Desplegable*/}
            <div style ={{position: 'relative'}}>
                <button onClick={toggleMenu} 
                style = {{
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
                    ☰
                </button>
                {isMenuOpen && (
                    <nav id="main-menu" style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        left: 0,
                        backgroundColor: '#3a3f47',
                        borderRadius: '5px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                        minWidth: '180px',
                        zIndex: 1001,
                        padding: '10px 0',
                    }}
                    >
                        <ul style = {{listStyle: 'none', padding: 0, margin: 0}}>
                            <li 
                                style = {{padding: '8px 15px', borderBottom: '1px solid #444'}}
                                onMouseEnter = {()=> setHoveredLink('home')}
                                onMouseLeave = {()=> setHoveredLink(null)}
                            >
                                <Link href="/" onClick={toggleMenu} 
                                style={{ 
                                    color: hoveredLink === 'home' ? '#61dafb' : 'white', 
                                    textDecoration: 'none', display: 'block' }}
                                >
                                Inicio
                                </Link>
                            </li>
                            <li style={{ padding: '8px 15px', borderBottom: '1px solid #4a4f57' }}
                                onMouseEnter = {()=> setHoveredLink('Lista de Tareas')}
                                onMouseLeave = {()=> setHoveredLink(null)}
                                >
                                <Link href="/todos" onClick={toggleMenu} 
                                style={{ 
                                    color: hoveredLink === 'Lista de Tareas' ? '#61dafb' : 'white', 
                                    textDecoration: 'none', 
                                    display: 'block' ,
                                    transition: 'color 0.3s ease'
                                }}>
                                Lista de Tareas
                                </Link>
                            </li>
                            <li style={{ padding: '8px 15px', borderBottom: '1px solid #4a4f57' }}
                                onMouseEnter = {()=> setHoveredLink('posts')}
                                onMouseLeave = {()=> setHoveredLink(null)}
                                >
                                <Link href="/posts" onClick={toggleMenu} 
                                style={{ 
                                    color: hoveredLink === 'posts' ? '#61dafb' : 'white', 
                                    textDecoration: 'none', 
                                    display: 'block',
                                    transition: 'color 0.3s ease' 
                                }}>
                                Posts
                                </Link>
                            </li>
                            <li style={{ padding: '8px 15px' }}
                                onMouseEnter = {()=> setHoveredLink('chatBot')}
                                onMouseLeave = {()=> setHoveredLink(null)}
                                >
                                <Link href="/chatBot" onClick={toggleMenu} 
                                style={{ 
                                    color: hoveredLink === 'chatBot' ? '#61dafb' : 'white', 
                                    textDecoration: 'none', 
                                    display: 'block',
                                    transition: 'color 0.3s ease' 
                                }}>
                                Chatbot
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>

            {/*Centro: Imagen del Logo*/}
            <div style = {{flexGrow: 1, textAlign: 'center'}}>
                <h2 style={{ margin:0, color: '#61dafb'}}> Mi App Redux</h2>
            </div>

            {/* Lado Derecho: Icono de Iniciar Sesión*/ }
            <div>
                <button 
                onClick={() => alert('Iniciar sesión')}
                style = {{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.5em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                title = "Iniciar Sesión"
                >
                    
                    <Image src="/login-icon.png" alt="Iniciar Sesión" width={24} height={24} />
                </button>
            </div>

        </header>
    );

};

export default Header;