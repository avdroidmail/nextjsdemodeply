'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import CountryStats from '@/components/CountryStats';
import CountryCard from '@/components/CountryCard';
import CountryModal from '@/components/CountryModal';
import Footer from '@/components/Footer';
import { Country } from '@/types/country';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [dbSource, setDbSource] = useState<string>('Connecting to MySQL...');
  const [dbError, setDbError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('country_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore SSR/storage error
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (cca3: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(cca3)
        ? prev.filter((code) => code !== cca3)
        : [...prev, cca3];
      try {
        localStorage.setItem('country_favorites', JSON.stringify(next));
      } catch (err) {}
      return next;
    });
  };

  // Fetch countries from MySQL API endpoint
  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true);
        setDbError(null);
        const res = await fetch('/api/countries');
        const json = await res.json();
        if (res.ok && json.success) {
          setCountries(json.data || []);
          setDbSource(json.source || 'MySQL (nextjsdemo.countries)');
        } else {
          setDbError(json.error || 'Failed to fetch country data from MySQL database.');
          setDbSource('MySQL Connection Error');
        }
      } catch (err: any) {
        setDbError(`Error connecting to API: ${err?.message || 'Unknown error'}`);
        setDbSource('MySQL Connection Failed');
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  // Filter and sort logic
  const filteredCountries = useMemo(() => {
    return countries
      .filter((c) => {
        // Region filter
        if (selectedRegion !== 'All' && c.region !== selectedRegion) {
          return false;
        }

        // Favorites filter
        if (favoritesOnly && !favorites.includes(c.cca3)) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const nameMatch = c.name.common.toLowerCase().includes(q) || c.name.official.toLowerCase().includes(q);
          const capitalMatch = Array.isArray(c.capital) && c.capital.some((cap) => cap.toLowerCase().includes(q));
          const codeMatch = c.cca3.toLowerCase().includes(q);
          const regionMatch = c.region.toLowerCase().includes(q);
          return nameMatch || capitalMatch || codeMatch || regionMatch;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return a.name.common.localeCompare(b.name.common);
        } else if (sortBy === 'name-desc') {
          return b.name.common.localeCompare(a.name.common);
        } else if (sortBy === 'pop-desc') {
          return b.population - a.population;
        } else if (sortBy === 'pop-asc') {
          return a.population - b.population;
        } else if (sortBy === 'area-desc') {
          return (b.area || 0) - (a.area || 0);
        }
        return 0;
      });
  }, [countries, selectedRegion, favoritesOnly, favorites, searchQuery, sortBy]);

  // Pick a random country
  const handleRandomCountry = () => {
    if (countries.length > 0) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      setSelectedCountry(countries[randomIndex]);
    }
  };

  const handleSelectBorderCountry = (code: string) => {
    const found = countries.find((c) => c.cca3.toUpperCase() === code.toUpperCase());
    if (found) {
      setSelectedCountry(found);
    } else {
      setSearchQuery(code);
      setSelectedCountry(null);
    }
  };

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar dbSource={dbSource} totalCount={countries.length} />

      <main style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '32px 24px' }}>
        
        {/* Quick Stats Header */}
        <CountryStats
          countries={countries}
          filteredCount={filteredCountries.length}
          favoriteCount={favorites.length}
          activeRegion={selectedRegion}
        />

        {/* Filter and Controls Toolbar */}
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Search Input Box */}
            <div style={{ position: 'relative', flex: '1 1 300px' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px',
                color: 'var(--text-dim)'
              }}>
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country name, capital, ISO code..."
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & Action Options */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              
              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="name-asc" style={{ background: '#0f172a' }}>Sort: Name (A - Z)</option>
                <option value="name-desc" style={{ background: '#0f172a' }}>Sort: Name (Z - A)</option>
                <option value="pop-desc" style={{ background: '#0f172a' }}>Sort: Population (High → Low)</option>
                <option value="pop-asc" style={{ background: '#0f172a' }}>Sort: Population (Low → High)</option>
                <option value="area-desc" style={{ background: '#0f172a' }}>Sort: Land Area (Large → Small)</option>
              </select>

              {/* Favorites Filter Toggle */}
              <button
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  backgroundColor: favoritesOnly ? 'rgba(236, 72, 153, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: favoritesOnly ? '1px solid rgba(236, 72, 153, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)',
                  color: favoritesOnly ? '#f472b6' : 'var(--text-main)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                {favoritesOnly ? '❤️ Favorites Only' : '🤍 Show Favorites'}
              </button>

              {/* Random Country Button */}
              <button
                onClick={handleRandomCountry}
                className="btn-secondary"
                style={{ padding: '12px 16px', fontSize: '0.9rem' }}
                title="Pick a random country to explore!"
              >
                🎲 Random
              </button>

              {/* View Switcher */}
              <div style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: viewMode === 'grid' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                    color: viewMode === 'grid' ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  title="Grid View"
                >
                  ▦ Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: viewMode === 'table' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                    color: viewMode === 'table' ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  title="Table View"
                >
                  ≡ Table
                </button>
              </div>
            </div>
          </div>

          {/* Region Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '20px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: selectedRegion === region ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: selectedRegion === region ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: selectedRegion === region ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: selectedRegion === region ? '700' : '500',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {region === 'All' ? '🌐 All Regions' : region}
              </button>
            ))}
          </div>
        </div>

        {/* DB Error Banner */}
        {dbError ? (
          <div className="glass-panel" style={{
            padding: '32px 24px',
            textAlign: 'center',
            marginBottom: '32px',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚠️</div>
            <h3 style={{ color: '#f87171', fontSize: '1.2rem', marginBottom: '8px' }}>MySQL Connection Error</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 16px' }}>
              {dbError}
            </p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              Make sure your MySQL database <code style={{ color: '#f87171' }}>nextjsdemo</code> is running and Environment Variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) are properly set.
            </p>
          </div>
        ) : loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔄</div>
            <div>Loading countries from MySQL database...</div>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px' }}>No Countries Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              No country matches your query &quot;{searchQuery}&quot; in region &quot;{selectedRegion}&quot;.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedRegion('All'); setFavoritesOnly(false); }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                isFavorite={favorites.includes(country.cca3)}
                onToggleFavorite={toggleFavorite}
                onSelect={(c) => setSelectedCountry(c)}
              />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="glass-panel" style={{ overflowX: 'auto', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '16px 20px' }}>Fav</th>
                  <th style={{ padding: '16px 20px' }}>Flag</th>
                  <th style={{ padding: '16px 20px' }}>Country Name</th>
                  <th style={{ padding: '16px 20px' }}>Capital</th>
                  <th style={{ padding: '16px 20px' }}>Region</th>
                  <th style={{ padding: '16px 20px' }}>Population</th>
                  <th style={{ padding: '16px 20px' }}>ISO Code</th>
                </tr>
              </thead>
              <tbody>
                {filteredCountries.map((country) => (
                  <tr
                    key={country.cca3}
                    onClick={() => setSelectedCountry(country)}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '14px 20px' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => toggleFavorite(country.cca3, e)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                      >
                        {favorites.includes(country.cca3) ? '❤️' : '🤍'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ width: '36px', height: '24px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#1e293b' }}>
                        {country.flags?.png || country.flags?.svg ? (
                          <img src={country.flags.png || country.flags.svg} alt={country.name.common} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : '🌐'}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: '#fff' }}>
                      {country.name.common}
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                      {Array.isArray(country.capital) ? country.capital.join(', ') : 'N/A'}
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                      {country.region}
                    </td>
                    <td style={{ padding: '14px 20px', color: '#fff', fontWeight: '600' }}>
                      {country.population.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                      {country.cca3}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <CountryModal
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
        onSelectBorderCountry={handleSelectBorderCountry}
      />

      <Footer />
    </div>
  );
}
