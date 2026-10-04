export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      backgroundColor: 'rgba(4, 6, 10, 0.95)',
      padding: '48px 24px 32px 24px',
      fontSize: '0.875rem',
      color: 'var(--text-muted)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        <div>
          <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#fff', marginBottom: '12px' }}>
            Next.js Showcase
          </div>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '16px' }}>
            A comprehensive reference application demonstrating modern App Router features, React 19 server components, and responsive design systems.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', color: 'var(--text-muted)' }}>Next.js 15+</span>
            <span style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', color: 'var(--text-muted)' }}>React 19</span>
            <span style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', color: 'var(--text-muted)' }}>TypeScript</span>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: '700', color: '#fff', marginBottom: '16px' }}>Resources</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="https://nextjs.org/docs" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Next.js Documentation</a></li>
            <li><a href="https://nextjs.org/learn" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Interactive Learning Course</a></li>
            <li><a href="https://github.com/vercel/next.js" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>GitHub Repository</a></li>
            <li><a href="https://vercel.com/templates" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Vercel Templates</a></li>
          </ul>
        </div>

        <div>
          <div style={{ fontWeight: '700', color: '#fff', marginBottom: '16px' }}>Framework Highlights</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>Server Components (RSC)</li>
            <li>Server Actions & Revalidation</li>
            <li>Partial Prerendering (PPR)</li>
            <li>Turbopack Engine</li>
          </ul>
        </div>

        <div>
          <div style={{ fontWeight: '700', color: '#fff', marginBottom: '16px' }}>System Operational</div>
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.06)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--accent-emerald)',
              boxShadow: '0 0 10px var(--accent-emerald)'
            }} />
            <div>
              <div style={{ fontWeight: '600', color: '#fff', fontSize: '0.85rem' }}>All Systems Online</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Latency: 12ms | Hydration: 0ms</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        color: 'var(--text-dim)',
        fontSize: '0.8rem'
      }}>
        <div>© {new Date().getFullYear()} Next.js Demo Application. Built for performance and visual excellence.</div>
        <div>Created with Next.js App Router & TypeScript</div>
      </div>
    </footer>
  );
}
