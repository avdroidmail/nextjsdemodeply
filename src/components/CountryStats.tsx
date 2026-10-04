'use client';

import React from 'react';
import { Country } from '@/types/country';

interface CountryStatsProps {
  countries: Country[];
  filteredCount: number;
  favoriteCount: number;
  activeRegion: string;
}

export default function CountryStats({
  countries,
  filteredCount,
  favoriteCount,
  activeRegion,
}: CountryStatsProps) {
  const totalPopulation = countries.reduce((sum, c) => sum + (c.population || 0), 0);
  const totalArea = countries.reduce((sum, c) => sum + (c.area || 0), 0);
  const regionsCount = new Set(countries.map((c) => c.region).filter(Boolean)).size;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px',
      marginBottom: '28px'
    }}>
      {/* Stat Card 1 */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          fontSize: '28px',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'rgba(6, 182, 212, 0.15)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          🗺️
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Countries Shown
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff' }}>
            {filteredCount} <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: '400' }}>/ {countries.length}</span>
          </div>
        </div>
      </div>

      {/* Stat Card 2 */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          fontSize: '28px',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          👥
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Population
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#ffffff' }}>
            {(totalPopulation / 1e9).toFixed(2)} Billion
          </div>
        </div>
      </div>

      {/* Stat Card 3 */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          fontSize: '28px',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          🌐
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Regions Filtered
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#ffffff' }}>
            {activeRegion === 'All' ? `${regionsCount} Regions` : activeRegion}
          </div>
        </div>
      </div>

      {/* Stat Card 4 */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          fontSize: '28px',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'rgba(236, 72, 153, 0.15)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          ⭐
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Saved Favorites
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff' }}>
            {favoriteCount}
          </div>
        </div>
      </div>
    </div>
  );
}
