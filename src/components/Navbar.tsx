'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(7, 9, 14, 0.75)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '800',
            fontSize: '18px',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
          }}>
            N
          </div>
          <div>
            <span style={{ fontWeight: '800', fontSize: '1.125rem', color: '#fff', letterSpacing: '-0.02em' }}>
              Next.js <span style={{ color: 'var(--accent-cyan)' }}>15+</span>
            </span>
            <span style={{
              fontSize: '0.65rem',
              display: 'block',
              color: 'var(--text-dim)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              App Router Demo
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '4px',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {[
            { id: 'home', label: 'Overview', href: '#overview' },
            { id: 'lab', label: 'Feature Lab', href: '#lab' },
            { id: 'architecture', label: 'Architecture', href: '#architecture' },
            { id: 'terminal', label: 'CLI Terminal', href: '#terminal' },
          ].map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: activeTab === item.id ? '#ffffff' : 'var(--text-muted)',
                backgroundColor: activeTab === item.id ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                border: activeTab === item.id ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA / Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: '0.75rem',
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
            Turbo Engine Active
          </div>

          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.875rem' }}
          >
            Docs ↗
          </a>
        </div>
      </div>
    </header>
  );
}
