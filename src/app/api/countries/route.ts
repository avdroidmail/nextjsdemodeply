import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Country } from '@/types/country';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await query<any[]>('SELECT * FROM countries ORDER BY common_name ASC');

    const countries: Country[] = (rows || []).map((row) => {
      let capitalArr: string[] = [];
      if (row.capital) {
        capitalArr = row.capital.split(',').map((s: string) => s.trim()).filter(Boolean);
      }

      let currenciesObj = {};
      try {
        currenciesObj = typeof row.currencies === 'string' ? JSON.parse(row.currencies) : (row.currencies || {});
      } catch (e) {
        currenciesObj = {};
      }

      let languagesObj = {};
      try {
        languagesObj = typeof row.languages === 'string' ? JSON.parse(row.languages) : (row.languages || {});
      } catch (e) {
        languagesObj = {};
      }

      let bordersArr: string[] = [];
      try {
        bordersArr = typeof row.borders === 'string' ? JSON.parse(row.borders) : (row.borders || []);
      } catch (e) {
        bordersArr = [];
      }

      let timezonesArr: string[] = [];
      try {
        timezonesArr = typeof row.timezones === 'string' ? JSON.parse(row.timezones) : (row.timezones || []);
      } catch (e) {
        timezonesArr = [];
      }

      return {
        cca3: row.cca3,
        name: {
          common: row.common_name,
          official: row.official_name || row.common_name,
        },
        capital: capitalArr,
        region: row.region || '',
        subregion: row.subregion || '',
        population: Number(row.population || 0),
        area: Number(row.area || 0),
        flags: {
          png: row.flag_png || '',
          svg: row.flag_svg || '',
        },
        currencies: currenciesObj,
        languages: languagesObj,
        borders: bordersArr,
        timezones: timezonesArr,
        maps: {
          googleMaps: row.maps_url || '',
        },
      };
    });

    return NextResponse.json({
      success: true,
      source: 'MySQL (nextjsdemo.countries)',
      count: countries.length,
      data: countries,
    });
  } catch (error: any) {
    console.error('MySQL Database Connection Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: `Database connection error: ${error?.message || 'Failed to connect to MySQL database'}`,
      },
      { status: 500 }
    );
  }
}
