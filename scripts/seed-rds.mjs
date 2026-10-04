import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST || 'nextjs-demo-db.cg9uu0o88vgj.us-east-1.rds.amazonaws.com';
const DB_USER = process.env.DB_USER || 'admin';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Password123!';
const DB_NAME = process.env.DB_NAME || 'nextjs-demo-db';

const initialCountries = [
  { cca3: 'IND', name: { common: 'India', official: 'Republic of India' }, capital: ['New Delhi'], region: 'Asia', subregion: 'Southern Asia', population: 1380004385, area: 3287590, flags: { png: 'https://flagcdn.w300/in.png', svg: 'https://flagcdn.com/in.svg' }, currencies: { INR: { name: 'Indian Rupee', symbol: '₹' } }, languages: { hin: 'Hindi', eng: 'English' }, borders: ['BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK'], timezones: ['UTC+05:30'], maps: { googleMaps: 'https://goo.gl/maps/WSk3fLwGAVN2' } },
  { cca3: 'USA', name: { common: 'United States', official: 'United States of America' }, capital: ['Washington, D.C.'], region: 'Americas', subregion: 'North America', population: 331449281, area: 9372610, flags: { png: 'https://flagcdn.w300/us.png', svg: 'https://flagcdn.com/us.svg' }, currencies: { USD: { name: 'United States Dollar', symbol: '$' } }, languages: { eng: 'English' }, borders: ['CAN', 'MEX'], timezones: ['UTC-05:00'], maps: { googleMaps: 'https://goo.gl/maps/eA2LVsKFiTstfFwB9' } },
  { cca3: 'GBR', name: { common: 'United Kingdom', official: 'United Kingdom' }, capital: ['London'], region: 'Europe', subregion: 'Northern Europe', population: 67215293, area: 242900, flags: { png: 'https://flagcdn.w300/gb.png', svg: 'https://flagcdn.com/gb.svg' }, currencies: { GBP: { name: 'British Pound', symbol: '£' } }, languages: { eng: 'English' }, borders: ['IRL'], timezones: ['UTC'], maps: { googleMaps: 'https://goo.gl/maps/WnWyoC1W2Z2m' } },
  { cca3: 'JPN', name: { common: 'Japan', official: 'Japan' }, capital: ['Tokyo'], region: 'Asia', subregion: 'Eastern Asia', population: 125836021, area: 377930, flags: { png: 'https://flagcdn.w300/jp.png', svg: 'https://flagcdn.com/jp.svg' }, currencies: { JPY: { name: 'Japanese Yen', symbol: '¥' } }, languages: { jpn: 'Japanese' }, borders: [], timezones: ['UTC+09:00'], maps: { googleMaps: 'https://goo.gl/maps/5ieEmt2wB3F2' } },
  { cca3: 'DEU', name: { common: 'Germany', official: 'Federal Republic of Germany' }, capital: ['Berlin'], region: 'Europe', subregion: 'Western Europe', population: 83240525, area: 357114, flags: { png: 'https://flagcdn.w300/de.png', svg: 'https://flagcdn.com/de.svg' }, currencies: { EUR: { name: 'Euro', symbol: '€' } }, languages: { deu: 'German' }, borders: ['AUT', 'BEL', 'FRA', 'POL'], timezones: ['UTC+01:00'], maps: { googleMaps: 'https://goo.gl/maps/mD9BiyFwNVpTGYxcA' } },
  { cca3: 'FRA', name: { common: 'France', official: 'French Republic' }, capital: ['Paris'], region: 'Europe', subregion: 'Western Europe', population: 67391582, area: 551695, flags: { png: 'https://flagcdn.w300/fr.png', svg: 'https://flagcdn.com/fr.svg' }, currencies: { EUR: { name: 'Euro', symbol: '€' } }, languages: { fra: 'French' }, borders: ['AND', 'BEL', 'DEU', 'ITA'], timezones: ['UTC+01:00'], maps: { googleMaps: 'https://goo.gl/maps/g71KwCRUDBkLicv2A' } },
  { cca3: 'CAN', name: { common: 'Canada', official: 'Canada' }, capital: ['Ottawa'], region: 'Americas', subregion: 'North America', population: 38005238, area: 9984670, flags: { png: 'https://flagcdn.w300/ca.png', svg: 'https://flagcdn.com/ca.svg' }, currencies: { CAD: { name: 'Canadian Dollar', symbol: '$' } }, languages: { eng: 'English', fra: 'French' }, borders: ['USA'], timezones: ['UTC-05:00'], maps: { googleMaps: 'https://goo.gl/maps/bRFbTStDxZzsZ47M7' } },
  { cca3: 'AUS', name: { common: 'Australia', official: 'Commonwealth of Australia' }, capital: ['Canberra'], region: 'Oceania', subregion: 'Australia and New Zealand', population: 25687041, area: 7692024, flags: { png: 'https://flagcdn.w300/au.png', svg: 'https://flagcdn.com/au.svg' }, currencies: { AUD: { name: 'Australian Dollar', symbol: '$' } }, languages: { eng: 'English' }, borders: [], timezones: ['UTC+10:00'], maps: { googleMaps: 'https://goo.gl/maps/DywS1x1Co4M2' } },
  { cca3: 'BRA', name: { common: 'Brazil', official: 'Federative Republic of Brazil' }, capital: ['Brasília'], region: 'Americas', subregion: 'South America', population: 212559409, area: 8515767, flags: { png: 'https://flagcdn.w300/br.png', svg: 'https://flagcdn.com/br.svg' }, currencies: { BRL: { name: 'Brazilian Real', symbol: 'R$' } }, languages: { por: 'Portuguese' }, borders: ['ARG', 'BOL', 'COL'], timezones: ['UTC-03:00'], maps: { googleMaps: 'https://goo.gl/maps/waCKk21HsefGvFfh8' } },
  { cca3: 'ZAF', name: { common: 'South Africa', official: 'Republic of South Africa' }, capital: ['Pretoria'], region: 'Africa', subregion: 'Southern Africa', population: 59308690, area: 1221037, flags: { png: 'https://flagcdn.w300/za.png', svg: 'https://flagcdn.com/za.svg' }, currencies: { ZAR: { name: 'South African Rand', symbol: 'R' } }, languages: { afr: 'Afrikaans', eng: 'English' }, borders: ['BWA', 'NAM', 'ZWE'], timezones: ['UTC+02:00'], maps: { googleMaps: 'https://goo.gl/maps/w1FevPWMt2mEQuality' } }
];

async function seedRDS() {
  console.log(`Connecting to AWS RDS MySQL server at ${DB_HOST}...`);
  let connection;
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      connectTimeout: 15000,
    });

    console.log(`Connected successfully! Creating database "${DB_NAME}" if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.query(`USE \`${DB_NAME}\`;`);

    console.log('Creating table "countries"...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS countries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cca3 VARCHAR(10) UNIQUE NOT NULL,
        common_name VARCHAR(255) NOT NULL,
        official_name VARCHAR(255),
        capital VARCHAR(255),
        region VARCHAR(100),
        subregion VARCHAR(100),
        population BIGINT,
        area DOUBLE,
        flag_png TEXT,
        flag_svg TEXT,
        currencies JSON,
        languages JSON,
        borders JSON,
        timezones JSON,
        maps_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log(`Inserting/Updating ${initialCountries.length} countries into AWS RDS MySQL table "countries"...`);

    for (const c of initialCountries) {
      const cca3 = c.cca3;
      const commonName = c.name.common;
      const officialName = c.name.official;
      const capital = Array.isArray(c.capital) ? c.capital.join(', ') : (c.capital || '');
      const region = c.region || '';
      const subregion = c.subregion || '';
      const population = c.population || 0;
      const area = c.area || 0;
      const flagPng = c.flags?.png || '';
      const flagSvg = c.flags?.svg || '';
      const currencies = JSON.stringify(c.currencies || {});
      const languages = JSON.stringify(c.languages || {});
      const borders = JSON.stringify(c.borders || []);
      const timezones = JSON.stringify(c.timezones || []);
      const mapsUrl = c.maps?.googleMaps || '';

      await connection.query(`
        INSERT INTO countries (
          cca3, common_name, official_name, capital, region, subregion,
          population, area, flag_png, flag_svg, currencies, languages,
          borders, timezones, maps_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          common_name = VALUES(common_name),
          official_name = VALUES(official_name),
          capital = VALUES(capital),
          region = VALUES(region),
          subregion = VALUES(subregion),
          population = VALUES(population),
          area = VALUES(area),
          flag_png = VALUES(flag_png),
          flag_svg = VALUES(flag_svg),
          currencies = VALUES(currencies),
          languages = VALUES(languages),
          borders = VALUES(borders),
          timezones = VALUES(timezones),
          maps_url = VALUES(maps_url);
      `, [
        cca3, commonName, officialName, capital, region, subregion,
        population, area, flagPng, flagSvg, currencies, languages,
        borders, timezones, mapsUrl
      ]);
    }

    const [rows] = await connection.query('SELECT COUNT(*) as count FROM countries');
    console.log(`✅ SUCCESS! AWS RDS Database "${DB_NAME}" now contains ${rows[0].count} countries in table "countries".`);

  } catch (error) {
    console.error('❌ RDS Database seed failed:', error);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

seedRDS();
