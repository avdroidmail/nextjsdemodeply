'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      backgroundColor: 'rgba(7, 9, 14, 0.9)',
      padding: '32px 24px',
      marginTop: '60px',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontWeight: '700', fontSize: '1rem', color: '#ffffff' }}>
            🌍 World Explorer and Country Directory
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Connected to local MySQL database <code style={{ color: 'var(--accent-emerald)' }}>nextjsdemo</code> • Next.js 15 App Router
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
          <span>MySQL 8.0</span>
          <span>•</span>
          <span>React 19</span>
          <span>•</span>
          <span>TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
