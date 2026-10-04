'use client';

import { useState } from 'react';

export default function Hero() {
  const [metricCount, setMetricCount] = useState(1420);
  const [copied, setCopied] = useState(false);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('npx create-next-app@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="overview" style={{
      position: 'relative',
      padding: '80px 24px 60px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      {/* Pill Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }} className="glass-pill">
        <span style={{
          backgroundColor: 'var(--accent-purple)',
          color: '#fff',
          fontSize: '0.7rem',
          fontWeight: '700',
          padding: '2px 8px',
          borderRadius: '9999px',
          textTransform: 'uppercase'
        }}>
          Next.js App Router
        </span>
        <span style={{ color: 'var(--text-main)', fontSize: '0.875rem' }}>
          Production-Ready Architecture Showcase
        </span>
      </div>

      {/* Main Title */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
        fontWeight: '800',
        letterSpacing: '-0.03em',
        lineHeight: 1.15,
        marginBottom: '24px',
      }}>
        Next-Generation Web Apps <br />
        <span className="gradient-text">Built with Speed & Precision</span>
      </h1>

      {/* Description */}
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        maxWidth: '720px',
        margin: '0 auto 40px auto',
        lineHeight: 1.7
      }}>
        Explore Next.js App Router with Server Components, Server Actions, Dynamic Streaming SSR, 
        and high-performance edge rendering in this interactive demonstration.
      </p>

      {/* CTA Buttons & Command Box */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '60px'
      }}>
        <a href="#lab" className="btn-primary">
          <span>Explore Feature Lab</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          padding: '8px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: 'var(--accent-cyan)'
        }}>
          <span>$ npx create-next-app@latest</span>
          <button
            onClick={handleCopyCmd}
            style={{
              background: 'none',
              border: 'none',
              color: copied ? 'var(--accent-emerald)' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '960px',
        margin: '0 auto'
      }}>
        {[
          { label: 'Lighthouse Score', value: '100 / 100', accent: 'var(--accent-emerald)', subtext: 'Core Web Vitals Optimized' },
          { label: 'SSR Hydration Time', value: '< 12ms', accent: 'var(--accent-cyan)', subtext: 'Streaming HTML Fragments' },
          { label: 'Requests Processed', value: `${metricCount.toLocaleString()}+`, accent: 'var(--accent-purple)', subtext: 'Simulated Dynamic Traffic' },
          { label: 'Bundle Efficiency', value: '-45% Size', accent: 'var(--accent-pink)', subtext: 'Zero JS Server Components' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '20px',
              textAlign: 'left',
              cursor: 'pointer'
            }}
            onClick={() => setMetricCount(prev => prev + 17)}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: stat.accent, marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
