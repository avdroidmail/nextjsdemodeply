'use client';

import React from 'react';

interface NavbarProps {
  dbSource?: string;
  totalCount: number;
}

export default function Navbar({ dbSource = 'MySQL (nextjsdemo)', totalCount }: NavbarProps) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(7, 9, 14, 0.8)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
          }}>
            🌍
          </div>
          <div>
            <h1 style={{
              fontWeight: '800',
              fontSize: '1.25rem',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1.2
            }}>
              Country Directory <span style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>Next.js 15+</span>
            </h1>
            <span style={{
              fontSize: '0.75rem',
              display: 'block',
              color: 'var(--text-muted)',
              marginTop: '2px'
            }}>
              Powered by MySQL DB (<code style={{ color: 'var(--accent-emerald)', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px' }}>nextjsdemo</code>)
            </span>
          </div>
        </div>

        {/* Database Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: '0.8rem',
            color: 'var(--accent-emerald)',
            fontWeight: '600'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-emerald)',
              boxShadow: '0 0 8px var(--accent-emerald)',
              display: 'inline-block'
            }} />
            DB Live: {dbSource}
          </div>

          <div style={{
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            fontSize: '0.8rem',
            color: '#a5b4fc',
            fontWeight: '600'
          }}>
            {totalCount} Countries Loaded
          </div>
        </div>
      </div>
    </header>
  );
}
