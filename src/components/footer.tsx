
'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px 20px',
            backgroundColor: '#282c34',
            color: 'white',
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            bottom: 0,
            width: '100%',
            marginTop: 'auto',
        }}>
            <p style={{ marginRight: '10px' }}>© 2023 Your Company</p>
            <Link href="/privacy-policy" style={{ color: 'white', textDecoration: 'underline' }}>
                Privacy Policy
            </Link>
        </footer>
    );
};

export default Footer;