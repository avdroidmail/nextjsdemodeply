'use client';

import { useState } from 'react';

export default function FeatureLab() {
  const [activeLabTab, setActiveLabTab] = useState<'server-action' | 'cache-monitor' | 'code-snippets'>('server-action');
  
  // Tab 1 state
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<Array<{ id: number; text: string; renderedOn: string; duration: number }>>([
    { id: 1, text: 'Initialize Next.js 15 App Router project', renderedOn: 'Server (RSC)', duration: 4 },
    { id: 2, text: 'Configure React Server Components & Streaming', renderedOn: 'Server (RSC)', duration: 6 },
    { id: 3, text: 'Verify Zero-JS Bundle Optimizations', renderedOn: 'Client (Interactive)', duration: 2 },
  ]);
  const [isMutating, setIsMutating] = useState(false);

  // Tab 2 state
  const [renderingMode, setRenderingMode] = useState<'rsc' | 'isr' | 'ppr'>('rsc');
  const [simulatedLatency, setSimulatedLatency] = useState(18);
  const [cacheHits, setCacheHits] = useState(482);
  const [cacheStatus, setCacheStatus] = useState<'HIT' | 'MISS' | 'REVALIDATED'>('HIT');

  // Tab 3 state
  const [codeTab, setCodeTab] = useState<'actions' | 'metadata' | 'streaming'>('actions');

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    setIsMutating(true);
    
    // Simulate server action latency
    await new Promise((res) => setTimeout(res, 400));
    
    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        text: todoInput,
        renderedOn: 'Server Action (Revalidated)',
        duration: Math.floor(Math.random() * 8) + 2,
      },
    ]);
    setTodoInput('');
    setIsMutating(false);
  };

  const handleSimulateRequest = () => {
    const latencies = { rsc: 12, isr: 4, ppr: 8 };
    setSimulatedLatency(latencies[renderingMode] + Math.floor(Math.random() * 5));
    setCacheHits(prev => prev + 1);
    setCacheStatus(Math.random() > 0.3 ? 'HIT' : 'REVALIDATED');
  };

  const codeSnippets = {
    actions: `// src/app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createItem(formData: FormData) {
  const title = formData.get('title') as string;
  await db.item.create({ data: { title } });
  revalidatePath('/dashboard');
  return { success: true };
}`,
    metadata: `// src/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js 15 Hub',
  description: 'Ultra-fast web application powered by Next.js App Router',
  openGraph: {
    title: 'Next.js 15 Showcase',
    images: ['/og-image.png'],
  },
};`,
    streaming: `// src/app/dashboard/page.tsx
import { Suspense } from 'react';
import AnalyticsWidget from './AnalyticsWidget';
import SkeletonLoader from './SkeletonLoader';

export default async function DashboardPage() {
  return (
    <main>
      <h1>Executive Dashboard</h1>
      <Suspense fallback={<SkeletonLoader />}>
        <AnalyticsWidget />
      </Suspense>
    </main>
  );
}`
  };

  return (
    <section id="lab" style={{
      maxWidth: '1280px',
      margin: '60px auto',
      padding: '0 24px',
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px' }}>
          Interactive <span className="gradient-text-purple">Feature Lab</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Test Next.js App Router features in real-time. Interact with server mutation models, cache simulators, and production code snippets.
        </p>
      </div>

      {/* Lab Outer Container */}
      <div className="glass-panel" style={{ overflow: 'hidden', padding: '0' }}>
        {/* Navigation Bar */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'rgba(15, 23, 42, 0.4)'
        }}>
          {[
            { id: 'server-action', label: '⚡ Server Actions Sandbox' },
            { id: 'cache-monitor', label: '📊 Cache & PPR Simulator' },
            { id: 'code-snippets', label: '💻 Interactive Code Patterns' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLabTab(tab.id as any)}
              style={{
                flex: 1,
                padding: '16px 20px',
                background: activeLabTab === tab.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                border: 'none',
                borderBottom: activeLabTab === tab.id ? '2px solid var(--accent-purple)' : '2px solid transparent',
                color: activeLabTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content 1: Server Actions Sandbox */}
        {activeLabTab === 'server-action' && (
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>
                  Simulate Server Action Mutation
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>
                  Submit a new task to execute zero-API client fetch mutation with automatic path revalidation.
                </p>

                <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                  <input
                    type="text"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    placeholder="Enter item title..."
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isMutating}
                    className="btn-primary"
                    style={{ padding: '12px 20px', whiteSpace: 'nowrap' }}
                  >
                    {isMutating ? 'Mutating...' : 'Submit Action'}
                  </button>
                </form>

                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.08)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  fontSize: '0.85rem',
                  color: 'var(--accent-cyan)'
                }}>
                  💡 <strong>How it works:</strong> Server Actions seamlessly execute backend logic without manually managing endpoint URLs or client state fetchers.
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    Revalidated Items List ({todos.length})
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>● Live Server State</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', color: '#fff' }}>{todo.text}</span>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: todo.renderedOn.includes('Server') ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                          color: todo.renderedOn.includes('Server') ? 'var(--accent-purple)' : 'var(--accent-emerald)',
                          fontWeight: '600'
                        }}>
                          {todo.renderedOn}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                          Exec: {todo.duration}ms
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Cache & PPR Simulator */}
        {activeLabTab === 'cache-monitor' && (
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>
                  Rendering Strategy Selector
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>
                  Select rendering strategies to see how Next.js optimizes HTML generation and caching.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { id: 'rsc', title: 'React Server Components (RSC)', desc: 'Renders component tree on server with zero client bundle overhead.' },
                    { id: 'isr', title: 'Incremental Static Revalidation (ISR)', desc: 'Serves static HTML instantly, revalidating in background.' },
                    { id: 'ppr', title: 'Partial Prerendering (PPR)', desc: 'Combines static shell with dynamic streaming slots.' },
                  ].map((mode) => (
                    <div
                      key={mode.id}
                      onClick={() => setRenderingMode(mode.id as any)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: renderingMode === mode.id ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: renderingMode === mode.id ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontWeight: '700', fontSize: '0.95rem', color: renderingMode === mode.id ? 'var(--accent-cyan)' : '#fff' }}>
                        {mode.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {mode.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={handleSimulateRequest} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  ⚡ Trigger Simulated Request
                </button>
              </div>

              {/* Monitor Visualizer */}
              <div style={{
                background: 'rgba(7, 9, 14, 0.8)',
                borderRadius: '14px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Live Diagnostics Dashboard
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Response Latency</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                      {simulatedLatency} <span style={{ fontSize: '0.9rem' }}>ms</span>
                    </div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Cache Status</div>
                    <div style={{
                      fontSize: '1.4rem',
                      fontWeight: '800',
                      color: cacheStatus === 'HIT' ? 'var(--accent-emerald)' : 'var(--accent-amber)'
                    }}>
                      {cacheStatus}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Cache Hit Ratio</span>
                    <span style={{ color: '#fff', fontWeight: '600' }}>99.4% ({cacheHits} hits)</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '99.4%', height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Code Snippets */}
        {activeLabTab === 'code-snippets' && (
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {[
                { id: 'actions', label: 'Server Actions' },
                { id: 'metadata', label: 'Metadata API' },
                { id: 'streaming', label: 'Suspense Streaming' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setCodeTab(sub.id as any)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    background: codeTab === sub.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    color: codeTab === sub.id ? '#fff' : 'var(--text-muted)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer'
                  }}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            <pre style={{
              background: '#030712',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#38bdf8',
              fontSize: '0.9rem',
              overflowX: 'auto',
              lineHeight: 1.6
            }}>
              <code>{codeSnippets[codeTab]}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
