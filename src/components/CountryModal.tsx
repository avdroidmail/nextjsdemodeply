'use client';

import React from 'react';
import { Country } from '@/types/country';

interface CountryModalProps {
  country: Country | null;
  onClose: () => void;
  onSelectBorderCountry?: (code: string) => void;
}

export default function CountryModal({
  country,
  onClose,
  onSelectBorderCountry,
}: CountryModalProps) {
  if (!country) return null;

  const capitalStr = Array.isArray(country.capital) && country.capital.length > 0
    ? country.capital.join(', ')
    : 'N/A';

  const currenciesList = country.currencies
    ? Object.entries(country.currencies)
        .map(([code, details]) => `${details.name} (${code}${details.symbol ? ` ${details.symbol}` : ''})`)
        .join(', ')
    : 'N/A';

  const languagesList = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  const timezonesList = country.timezones
    ? country.timezones.join(', ')
    : 'N/A';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }}
    onClick={onClose}
    >
      <div
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{
            width: '100px',
            height: '65px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: '#1e293b'
          }}>
            {country.flags?.png || country.flags?.svg ? (
              <img
                src={country.flags.svg || country.flags.png}
                alt={country.name.common}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '32px' }}>🌐</span>
            )}
          </div>

          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
              {country.name.common}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', margin: '4px 0 0 0' }}>
              {country.name.official}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🏛️ Capital</div>
            <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#fff', marginTop: '4px' }}>{capitalStr}</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>👥 Population</div>
            <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#fff', marginTop: '4px' }}>{country.population.toLocaleString()}</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 Region / Subregion</div>
            <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#fff', marginTop: '4px' }}>{country.region} {country.subregion ? `• ${country.subregion}` : ''}</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📐 Total Area</div>
            <div style={{ fontSize: '1.05rem', fontWeight: '600', color: '#fff', marginTop: '4px' }}>
              {country.area ? `${country.area.toLocaleString()} sq km` : 'N/A'}
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>💵 Currencies</div>
            <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--accent-emerald)', marginTop: '4px' }}>{currenciesList}</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🗣️ Languages</div>
            <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--accent-cyan)', marginTop: '4px' }}>{languagesList}</div>
          </div>
        </div>

        {/* Timezones & Extra Details */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>⏰ Timezones</div>
          <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>{timezonesList}</div>
        </div>

        {/* Bordering Countries */}
        {country.borders && country.borders.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              🚩 Bordering Countries (ISO Codes):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {country.borders.map((b) => (
                <button
                  key={b}
                  onClick={() => onSelectBorderCountry && onSelectBorderCountry(b)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: '#a5b4fc',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* External Links */}
        {country.maps?.googleMaps && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none' }}
            >
              🗺️ Open in Google Maps ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
