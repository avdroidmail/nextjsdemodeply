'use client';

export default function ArchitectureCards() {
  const cards = [
    {
      title: 'React Server Components',
      tag: 'Zero Bundle Size',
      color: 'var(--accent-purple)',
      icon: '⚡',
      description: 'Render complex UI trees on the server with zero client JavaScript weight, boosting core web vitals instantly.',
      features: ['Automatic Code Splitting', 'Direct DB Access', 'Streaming HTML Response']
    },
    {
      title: 'Server Actions & Mutations',
      tag: 'Type-Safe RPC',
      color: 'var(--accent-cyan)',
      icon: '🔄',
      description: 'Invoke async server-side functions directly from client buttons and forms without writing traditional API controllers.',
      features: ['Progressive Enhancement', 'Optimistic UI Updates', 'Cache Revalidation']
    },
    {
      title: 'Turbopack Bundler',
      tag: '10x Fast HMR',
      color: 'var(--accent-emerald)',
      icon: '🚀',
      description: 'Rust-powered incremental bundler providing instantaneous startup times and ultra-fast hot module replacement.',
      features: ['Lazy Compilation', 'Rust Architecture', 'Built-in SWC Transpilation']
    },
    {
      title: 'Parallel & Intercepting Routes',
      tag: 'Advanced Layouts',
      color: 'var(--accent-pink)',
      icon: '🔀',
      description: 'Render multiple simultaneous pages in independent slots or capture modal routes while maintaining clean browser URLs.',
      features: ['Conditional Slots', 'Modal Overlays', 'Soft/Hard Navigation']
    },
    {
      title: 'Edge Middleware',
      tag: 'Global Latency <5ms',
      color: 'var(--accent-amber)',
      icon: '🌐',
      description: 'Intercept and transform incoming requests before hitting origin servers for authentication, bot mitigation, and geo-routing.',
      features: ['V8 Edge Engine', 'Custom Headers & Cookies', 'A/B Testing']
    },
    {
      title: 'Built-in Image & Font Optimization',
      tag: 'Automated UX',
      color: 'var(--accent-cyan)',
      icon: '🎨',
      description: 'Automatically serve WebP/AVIF images with layout shift protection and self-hosted zero-CLS web fonts.',
      features: ['Automatic Resizing', 'Self-Hosted Google Fonts', 'Cumulative Layout Shift = 0']
    },
  ];

  return (
    <section id="architecture" style={{
      maxWidth: '1280px',
      margin: '80px auto',
      padding: '0 24px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px' }}>
          Core Architectural <span className="gradient-text">Pillars</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
          Engineered for maximum velocity, performance, and developer experience.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '28px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem'
                }}>
                  {card.icon}
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: `1px solid ${card.color}`,
                  color: card.color
                }}>
                  {card.tag}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>
                {card.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                {card.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {card.features.map((feat, fIdx) => (
                  <li key={fIdx} style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: card.color }}>✓</span> {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
