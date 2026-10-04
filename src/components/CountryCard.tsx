'use client';

import React from 'react';
import { Country } from '@/types/country';

interface CountryCardProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (cca3: string, e: React.MouseEvent) => void;
  onSelect: (country: Country) => void;
}

export default function CountryCard({
  country,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: CountryCardProps) {
  const capitalStr = Array.isArray(country.capital) && country.capital.length > 0
    ? country.capital.join(', ')
    : 'N/A';

  const currencyList = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ')
    : 'N/A';

  return (
    <div
      className="glass-panel"
      onClick={() => onSelect(country)}
      style={{
        padding: '20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Banner with Flag and Favorite Star */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}>
          {/* Flag Preview */}
          <div style={{
            width: '64px',
            height: '42px',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {country.flags?.png || country.flags?.svg ? (
              <img
                src={country.flags.png || country.flags.svg}
                alt={country.name.common}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            ) : (
              <span style={{ fontSize: '20px' }}>🌐</span>
            )}
          </div>

          {/* Region Badge & Favorite Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: '600',
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--text-muted)'
            }}>
              {country.region}
            </span>

            <button
              onClick={(e) => onToggleFavorite(country.cca3, e)}
              style={{
                background: isFavorite ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: isFavorite ? '1px solid rgba(236, 72, 153, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.2s ease',
              }}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        {/* Country Name */}
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '4px',
          lineHeight: 1.3
        }}>
          {country.name.common}
        </h3>
        <p style={{
          fontSize: '0.78rem',
          color: 'var(--text-dim)',
          marginBottom: '16px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {country.name.official}
        </p>

        {/* Details List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
            <span>🏛️ Capital:</span>
            <strong style={{ color: '#f1f5f9' }}>{capitalStr}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
            <span>👥 Population:</span>
            <strong style={{ color: '#f1f5f9' }}>{country.population.toLocaleString()}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>🔤 ISO Code:</span>
            <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{country.cca3}</strong>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{
        marginTop: '20px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: 'var(--accent-purple)'
      }}>
        <span>View Full Details</span>
        <span>→</span>
      </div>
    </div>
  );
}
