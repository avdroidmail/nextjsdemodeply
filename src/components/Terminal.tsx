'use client';

import { useState } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'next dev',
      output: '▲ Next.js 15.0.0\n- Local:        http://localhost:3000\n- Environments: .env.local\n✓ Ready in 1.4s (Turbopack)'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    let output = '';

    switch (trimmed) {
      case 'help':
        output = 'Available commands:\n  help      - Display available commands\n  status    - Check server health & Turbo compiler state\n  routes    - List registered App Router routes\n  build     - Simulate Next.js production build\n  clear     - Clear terminal history';
        break;
      case 'status':
        output = '✓ Status: ALL SYSTEMS OPERATIONAL\n- Turbopack: Active\n- React Version: 19.0.0\n- Node Engine: v20.x\n- Memory Usage: 48.2 MB';
        break;
      case 'routes':
        output = 'App Router Directory Tree:\n┌ / (page.tsx - RSC)\n├ /#overview (Anchor)\n├ /#lab (Feature Lab)\n└ /#terminal (Interactive Shell)';
        break;
      case 'build':
        output = 'Creating an optimized production build...\n✓ Compiled successfully\n✓ Linting and checking validity of types\n✓ Collecting page data\n✓ Generating static pages (5/5)\n✓ Finalizing page optimization';
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        output = `Command not recognized: "${cmdStr}". Type "help" for a list of valid commands.`;
    }

    setHistory(prev => [...prev, { cmd: cmdStr, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal) return;
    executeCommand(inputVal);
    setInputVal('');
  };

  return (
    <section id="terminal" style={{
      maxWidth: '1280px',
      margin: '60px auto 80px auto',
      padding: '0 24px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>
          Interactive <span className="gradient-text-amber">Next CLI Shell</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Test CLI commands in real-time or click quick presets below.
        </p>
      </div>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {['help', 'status', 'routes', 'build', 'clear'].map((preset) => (
          <button
            key={preset}
            onClick={() => executeCommand(preset)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            $ {preset}
          </button>
        ))}
      </div>

      {/* Terminal Window */}
      <div style={{
        background: '#090d16',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Terminal Header */}
        <div style={{
          background: '#04060a',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
            <span style={{ marginLeft: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              bash ~ nextjs-demo-terminal
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>UTF-8</span>
        </div>

        {/* Output Area */}
        <div style={{
          padding: '20px',
          minHeight: '260px',
          maxHeight: '400px',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem'
        }}>
          {history.map((item, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <div style={{ color: 'var(--accent-purple)', marginBottom: '4px' }}>
                <span style={{ color: 'var(--accent-emerald)' }}>user@nextjs-demo</span>:<span style={{ color: 'var(--accent-cyan)' }}>~</span>$ {item.cmd}
              </div>
              <pre style={{
                color: 'var(--text-muted)',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
                fontSize: '0.85rem'
              }}>
                {item.output}
              </pre>
            </div>
          ))}

          {/* Prompt Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <span style={{ color: 'var(--accent-emerald)' }}>user@nextjs-demo</span>
            <span style={{ color: 'var(--accent-cyan)' }}>~</span>
            <span style={{ color: '#fff' }}>$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command ('help', 'status', 'build')..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
