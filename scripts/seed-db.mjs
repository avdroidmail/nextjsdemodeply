import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_NAME = process.env.DB_NAME || 'nextjsdemo';

async function getWorkingConnection() {
  const passwordsToTry = [
    process.env.DB_PASSWORD,
    'root',
    'password',
    ''
  ].filter((p) => p !== undefined);

  for (const pwd of passwordsToTry) {
    try {
      const conn = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: pwd,
      });
      console.log(`Connected successfully using user "${DB_USER}" with password "${pwd}"`);
      return { conn, pwd };
    } catch (err) {
      // ignore
    }
  }
  throw new Error('Could not connect to MySQL with provided passwords.');
}

const countriesList = [
  {
    cca3: 'IND',
    name: { common: 'India', official: 'Republic of India' },
    capital: ['New Delhi'],
    region: 'Asia',
    subregion: 'Southern Asia',
    population: 1380004385,
    area: 3287590,
    flags: { png: 'https://flagcdn.w300/in.png', svg: 'https://flagcdn.com/in.svg' },
    currencies: { INR: { name: 'Indian Rupee', symbol: '₹' } },
    languages: { hin: 'Hindi', eng: 'English' },
    borders: ['BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK'],
    timezones: ['UTC+05:30'],
    maps: { googleMaps: 'https://goo.gl/maps/WSk3fLwGAVN2' }
  },
  {
    cca3: 'USA',
    name: { common: 'United States', official: 'United States of America' },
    capital: ['Washington, D.C.'],
    region: 'Americas',
    subregion: 'North America',
    population: 331449281,
    area: 9372610,
    flags: { png: 'https://flagcdn.w300/us.png', svg: 'https://flagcdn.com/us.svg' },
    currencies: { USD: { name: 'United States Dollar', symbol: '$' } },
    languages: { eng: 'English' },
    borders: ['CAN', 'MEX'],
    timezones: ['UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00'],
    maps: { googleMaps: 'https://goo.gl/maps/eA2LVsKFiTstfFwB9' }
  },
  {
    cca3: 'GBR',
    name: { common: 'United Kingdom', official: 'United Kingdom of Great Britain and Northern Ireland' },
    capital: ['London'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 67215293,
    area: 242900,
    flags: { png: 'https://flagcdn.w300/gb.png', svg: 'https://flagcdn.com/gb.svg' },
    currencies: { GBP: { name: 'British Pound', symbol: '£' } },
    languages: { eng: 'English' },
    borders: ['IRL'],
    timezones: ['UTC-08:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00', 'UTC', 'UTC+01:00', 'UTC+02:00', 'UTC+06:00'],
    maps: { googleMaps: 'https://goo.gl/maps/WnWyoC1W2Z2m' }
  },
  {
    cca3: 'JPN',
    name: { common: 'Japan', official: 'Japan' },
    capital: ['Tokyo'],
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 125836021,
    area: 377930,
    flags: { png: 'https://flagcdn.w300/jp.png', svg: 'https://flagcdn.com/jp.svg' },
    currencies: { JPY: { name: 'Japanese Yen', symbol: '¥' } },
    languages: { jpn: 'Japanese' },
    borders: [],
    timezones: ['UTC+09:00'],
    maps: { googleMaps: 'https://goo.gl/maps/5ieEmt2wB3F2' }
  },
  {
    cca3: 'DEU',
    name: { common: 'Germany', official: 'Federal Republic of Germany' },
    capital: ['Berlin'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 83240525,
    area: 357114,
    flags: { png: 'https://flagcdn.w300/de.png', svg: 'https://flagcdn.com/de.svg' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { deu: 'German' },
    borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/mD9BiyFwNVpTGYxcA' }
  },
  {
    cca3: 'FRA',
    name: { common: 'France', official: 'French Republic' },
    capital: ['Paris'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 67391582,
    area: 551695,
    flags: { png: 'https://flagcdn.w300/fr.png', svg: 'https://flagcdn.com/fr.svg' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { fra: 'French' },
    borders: ['AND', 'BEL', 'DEU', 'ITA', 'LUX', 'MCO', 'ESP', 'CHE'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/g71KwCRUDBkLicv2A' }
  },
  {
    cca3: 'CAN',
    name: { common: 'Canada', official: 'Canada' },
    capital: ['Ottawa'],
    region: 'Americas',
    subregion: 'North America',
    population: 38005238,
    area: 9984670,
    flags: { png: 'https://flagcdn.w300/ca.png', svg: 'https://flagcdn.com/ca.svg' },
    currencies: { CAD: { name: 'Canadian Dollar', symbol: '$' } },
    languages: { eng: 'English', fra: 'French' },
    borders: ['USA'],
    timezones: ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30'],
    maps: { googleMaps: 'https://goo.gl/maps/bRFbTStDxZzsZ47M7' }
  },
  {
    cca3: 'AUS',
    name: { common: 'Australia', official: 'Commonwealth of Australia' },
    capital: ['Canberra'],
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    population: 25687041,
    area: 7692024,
    flags: { png: 'https://flagcdn.w300/au.png', svg: 'https://flagcdn.com/au.svg' },
    currencies: { AUD: { name: 'Australian Dollar', symbol: '$' } },
    languages: { eng: 'English' },
    borders: [],
    timezones: ['UTC+05:00', 'UTC+06:30', 'UTC+07:00', 'UTC+08:00', 'UTC+09:30', 'UTC+10:00', 'UTC+10:30', 'UTC+11:00'],
    maps: { googleMaps: 'https://goo.gl/maps/DywS1x1Co4M2' }
  },
  {
    cca3: 'BRA',
    name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
    capital: ['Brasília'],
    region: 'Americas',
    subregion: 'South America',
    population: 212559409,
    area: 8515767,
    flags: { png: 'https://flagcdn.w300/br.png', svg: 'https://flagcdn.com/br.svg' },
    currencies: { BRL: { name: 'Brazilian Real', symbol: 'R$' } },
    languages: { por: 'Portuguese' },
    borders: ['ARG', 'BOL', 'COL', 'GUY', 'PRY', 'PER', 'SUR', 'URY', 'VEN'],
    timezones: ['UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00'],
    maps: { googleMaps: 'https://goo.gl/maps/waCKk21HsefGvFfh8' }
  },
  {
    cca3: 'ZAF',
    name: { common: 'South Africa', official: 'Republic of South Africa' },
    capital: ['Pretoria'],
    region: 'Africa',
    subregion: 'Southern Africa',
    population: 59308690,
    area: 1221037,
    flags: { png: 'https://flagcdn.w300/za.png', svg: 'https://flagcdn.com/za.svg' },
    currencies: { ZAR: { name: 'South African Rand', symbol: 'R' } },
    languages: { afr: 'Afrikaans', eng: 'English', zul: 'Zulu' },
    borders: ['BWA', 'LSO', 'MOZ', 'NAM', 'SWZ', 'ZWE'],
    timezones: ['UTC+02:00'],
    maps: { googleMaps: 'https://goo.gl/maps/w1FevPWMt2mEQuality' }
  },
  {
    cca3: 'CHN',
    name: { common: 'China', official: "People's Republic of China" },
    capital: ['Beijing'],
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 1402112000,
    area: 9706961,
    flags: { png: 'https://flagcdn.w300/cn.png', svg: 'https://flagcdn.com/cn.svg' },
    currencies: { CNY: { name: 'Chinese Yuan', symbol: '¥' } },
    languages: { zho: 'Mandarin' },
    borders: ['AFG', 'BTN', 'IND', 'KAZ', 'KGZ', 'LAO', 'MNG', 'MMR', 'NPL', 'PRK', 'PAK', 'RUS', 'TJK', 'VNM'],
    timezones: ['UTC+08:00'],
    maps: { googleMaps: 'https://goo.gl/maps/whwwSZTXtNBCch367' }
  },
  {
    cca3: 'RUS',
    name: { common: 'Russia', official: 'Russian Federation' },
    capital: ['Moscow'],
    region: 'Europe',
    subregion: 'Eastern Europe',
    population: 144104080,
    area: 17098242,
    flags: { png: 'https://flagcdn.w300/ru.png', svg: 'https://flagcdn.com/ru.svg' },
    currencies: { RUB: { name: 'Russian Ruble', symbol: '₽' } },
    languages: { rus: 'Russian' },
    borders: ['AZE', 'BLR', 'CHN', 'EST', 'FIN', 'GEO', 'KAZ', 'PRK', 'LVA', 'LTU', 'MNG', 'NOR', 'POL', 'UKR'],
    timezones: ['UTC+02:00', 'UTC+03:00'],
    maps: { googleMaps: 'https://goo.gl/maps/hTmtEsCkj2B78vsv8' }
  },
  {
    cca3: 'MEX',
    name: { common: 'Mexico', official: 'United Mexican States' },
    capital: ['Mexico City'],
    region: 'Americas',
    subregion: 'North America',
    population: 128932753,
    area: 1964375,
    flags: { png: 'https://flagcdn.w300/mx.png', svg: 'https://flagcdn.com/mx.svg' },
    currencies: { MXN: { name: 'Mexican Peso', symbol: '$' } },
    languages: { spa: 'Spanish' },
    borders: ['BLZ', 'GTM', 'USA'],
    timezones: ['UTC-06:00'],
    maps: { googleMaps: 'https://goo.gl/maps/15mE6F2fBCMKWxRj8' }
  },
  {
    cca3: 'ITA',
    name: { common: 'Italy', official: 'Italian Republic' },
    capital: ['Rome'],
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 59554023,
    area: 301336,
    flags: { png: 'https://flagcdn.w300/it.png', svg: 'https://flagcdn.com/it.svg' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { ita: 'Italian' },
    borders: ['AUT', 'FRA', 'SMR', 'SVN', 'CHE', 'VAT'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/8Ekgf8PLA48BfvN3A' }
  },
  {
    cca3: 'ESP',
    name: { common: 'Spain', official: 'Kingdom of Spain' },
    capital: ['Madrid'],
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 47351567,
    area: 505992,
    flags: { png: 'https://flagcdn.w300/es.png', svg: 'https://flagcdn.com/es.svg' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { spa: 'Spanish' },
    borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/138gToWCG7mHQfdk8' }
  },
  {
    cca3: 'ARG',
    name: { common: 'Argentina', official: 'Argentine Republic' },
    capital: ['Buenos Aires'],
    region: 'Americas',
    subregion: 'South America',
    population: 45376763,
    area: 2780400,
    flags: { png: 'https://flagcdn.w300/ar.png', svg: 'https://flagcdn.com/ar.svg' },
    currencies: { ARS: { name: 'Argentine Peso', symbol: '$' } },
    languages: { spa: 'Spanish' },
    borders: ['BOL', 'BRA', 'CHL', 'PRY', 'URY'],
    timezones: ['UTC-03:00'],
    maps: { googleMaps: 'https://goo.gl/maps/ZKG6auTjjSHsqP8v6' }
  },
  {
    cca3: 'EGY',
    name: { common: 'Egypt', official: 'Arab Republic of Egypt' },
    capital: ['Cairo'],
    region: 'Africa',
    subregion: 'Northern Africa',
    population: 102334403,
    area: 1002450,
    flags: { png: 'https://flagcdn.w300/eg.png', svg: 'https://flagcdn.com/eg.svg' },
    currencies: { EGP: { name: 'Egyptian Pound', symbol: 'E£' } },
    languages: { ara: 'Arabic' },
    borders: ['ISR', 'LBY', 'SDN'],
    timezones: ['UTC+02:00'],
    maps: { googleMaps: 'https://goo.gl/maps/uo8nWk8vLvxZzb2Z9' }
  },
  {
    cca3: 'SAU',
    name: { common: 'Saudi Arabia', official: 'Kingdom of Saudi Arabia' },
    capital: ['Riyadh'],
    region: 'Asia',
    subregion: 'Western Asia',
    population: 34813867,
    area: 2149690,
    flags: { png: 'https://flagcdn.w300/sa.png', svg: 'https://flagcdn.com/sa.svg' },
    currencies: { SAR: { name: 'Saudi Riyal', symbol: '﷼' } },
    languages: { ara: 'Arabic' },
    borders: ['IRQ', 'JOR', 'KWT', 'OMN', 'QAT', 'ARE', 'YEM'],
    timezones: ['UTC+03:00'],
    maps: { googleMaps: 'https://goo.gl/maps/u5mY5BCQ24T8V2Uq9' }
  },
  {
    cca3: 'ARE',
    name: { common: 'United Arab Emirates', official: 'United Arab Emirates' },
    capital: ['Abu Dhabi'],
    region: 'Asia',
    subregion: 'Western Asia',
    population: 9890400,
    area: 83600,
    flags: { png: 'https://flagcdn.w300/ae.png', svg: 'https://flagcdn.com/ae.svg' },
    currencies: { AED: { name: 'United Arab Emirates Dirham', symbol: 'د.إ' } },
    languages: { ara: 'Arabic' },
    borders: ['OMN', 'SAU'],
    timezones: ['UTC+04:00'],
    maps: { googleMaps: 'https://goo.gl/maps/AZZTjRtA3A5m878PA' }
  },
  {
    cca3: 'SGP',
    name: { common: 'Singapore', official: 'Republic of Singapore' },
    capital: ['Singapore'],
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    population: 5685807,
    area: 710,
    flags: { png: 'https://flagcdn.w300/sg.png', svg: 'https://flagcdn.com/sg.svg' },
    currencies: { SGD: { name: 'Singapore Dollar', symbol: '$' } },
    languages: { eng: 'English', zho: 'Mandarin' },
    borders: [],
    timezones: ['UTC+08:00'],
    maps: { googleMaps: 'https://goo.gl/maps/13mrAawXuK9CQAea7' }
  },
  {
    cca3: 'NZL',
    name: { common: 'New Zealand', official: 'New Zealand' },
    capital: ['Wellington'],
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    population: 5084300,
    area: 270467,
    flags: { png: 'https://flagcdn.w300/nz.png', svg: 'https://flagcdn.com/nz.svg' },
    currencies: { NZD: { name: 'New Zealand Dollar', symbol: '$' } },
    languages: { eng: 'English', mri: 'Māori' },
    borders: [],
    timezones: ['UTC+12:00'],
    maps: { googleMaps: 'https://goo.gl/maps/x2feqqYrYBEXCy9A7' }
  },
  {
    cca3: 'IDN',
    name: { common: 'Indonesia', official: 'Republic of Indonesia' },
    capital: ['Jakarta'],
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    population: 273523621,
    area: 1904569,
    flags: { png: 'https://flagcdn.w300/id.png', svg: 'https://flagcdn.com/id.svg' },
    currencies: { IDR: { name: 'Indonesian Rupiah', symbol: 'Rp' } },
    languages: { ind: 'Indonesian' },
    borders: ['TLS', 'MYS', 'PNG'],
    timezones: ['UTC+07:00'],
    maps: { googleMaps: 'https://goo.gl/maps/9Bq7hBn26R4t5XbJ7' }
  },
  {
    cca3: 'KOR',
    name: { common: 'South Korea', official: 'Republic of Korea' },
    capital: ['Seoul'],
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 51780579,
    area: 100210,
    flags: { png: 'https://flagcdn.w300/kr.png', svg: 'https://flagcdn.com/kr.svg' },
    currencies: { KRW: { name: 'South Korean Won', symbol: '₩' } },
    languages: { kor: 'Korean' },
    borders: ['PRK'],
    timezones: ['UTC+09:00'],
    maps: { googleMaps: 'https://goo.gl/maps/7ecgfd2ySt2p52H18' }
  },
  {
    cca3: 'TUR',
    name: { common: 'Turkey', official: 'Republic of Türkiye' },
    capital: ['Ankara'],
    region: 'Asia',
    subregion: 'Western Asia',
    population: 84339067,
    area: 783562,
    flags: { png: 'https://flagcdn.w300/tr.png', svg: 'https://flagcdn.com/tr.svg' },
    currencies: { TRY: { name: 'Turkish Lira', symbol: '₺' } },
    languages: { tur: 'Turkish' },
    borders: ['ARM', 'BGR', 'GEO', 'GRC', 'IRN', 'IRQ', 'SYR'],
    timezones: ['UTC+03:00'],
    maps: { googleMaps: 'https://goo.gl/maps/dX2d4N4x3w1' }
  },
  {
    cca3: 'NLD',
    name: { common: 'Netherlands', official: 'Kingdom of the Netherlands' },
    capital: ['Amsterdam'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 17441139,
    area: 41850,
    flags: { png: 'https://flagcdn.w300/nl.png', svg: 'https://flagcdn.com/nl.svg' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { nld: 'Dutch' },
    borders: ['BEL', 'DEU'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/bAo12yM9J2B2' }
  },
  {
    cca3: 'CHE',
    name: { common: 'Switzerland', official: 'Swiss Confederation' },
    capital: ['Bern'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 8654622,
    area: 41284,
    flags: { png: 'https://flagcdn.w300/ch.png', svg: 'https://flagcdn.com/ch.svg' },
    currencies: { CHF: { name: 'Swiss Franc', symbol: 'CHF' } },
    languages: { deu: 'German', fra: 'French', ita: 'Italian' },
    borders: ['AUT', 'FRA', 'ITA', 'LIE', 'DEU'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/15h7H2B78k' }
  },
  {
    cca3: 'SWE',
    name: { common: 'Sweden', official: 'Kingdom of Sweden' },
    capital: ['Stockholm'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 10353442,
    area: 450295,
    flags: { png: 'https://flagcdn.w300/se.png', svg: 'https://flagcdn.com/se.svg' },
    currencies: { SEK: { name: 'Swedish Krona', symbol: 'kr' } },
    languages: { swe: 'Swedish' },
    borders: ['FIN', 'NOR'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/mQg2s4Y2A1' }
  },
  {
    cca3: 'NOR',
    name: { common: 'Norway', official: 'Kingdom of Norway' },
    capital: ['Oslo'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 5379475,
    area: 323802,
    flags: { png: 'https://flagcdn.w300/no.png', svg: 'https://flagcdn.com/no.svg' },
    currencies: { NOK: { name: 'Norwegian Krone', symbol: 'kr' } },
    languages: { nob: 'Norwegian' },
    borders: ['FIN', 'SWE', 'RUS'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/li5n1v7u1' }
  },
  {
    cca3: 'DNK',
    name: { common: 'Denmark', official: 'Kingdom of Denmark' },
    capital: ['Copenhagen'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 5831404,
    area: 43094,
    flags: { png: 'https://flagcdn.w300/dk.png', svg: 'https://flagcdn.com/dk.svg' },
    currencies: { DKK: { name: 'Danish Krone', symbol: 'kr' } },
    languages: { dan: 'Danish' },
    borders: ['DEU'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/3Jz1z2s1' }
  },
  {
    cca3: 'FIN',
    name: { common: 'Finland', official: 'Republic of Finland' },
    capital: ['Helsinki'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 5530719,
    area: 338424,
    flags: { png: 'https://flagcdn.w300/fi.png', svg: 'https://flagcdn.com/fi.svg' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { fin: 'Finnish', swe: 'Swedish' },
    borders: ['NOR', 'SWE', 'RUS'],
    timezones: ['UTC+02:00'],
    maps: { googleMaps: 'https://goo.gl/maps/fi123' }
  },
  {
    cca3: 'IRL',
    name: { common: 'Ireland', official: 'Republic of Ireland' },
    capital: ['Dublin'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 4994724,
    area: 70273,
    flags: { png: 'https://flagcdn.w300/ie.png', svg: 'https://flagcdn.com/ie.svg' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { eng: 'English', gle: 'Irish' },
    borders: ['GBR'],
    timezones: ['UTC'],
    maps: { googleMaps: 'https://goo.gl/maps/ie123' }
  },
  {
    cca3: 'POL',
    name: { common: 'Poland', official: 'Republic of Poland' },
    capital: ['Warsaw'],
    region: 'Europe',
    subregion: 'Central Europe',
    population: 37958138,
    area: 312696,
    flags: { png: 'https://flagcdn.w300/pl.png', svg: 'https://flagcdn.com/pl.svg' },
    currencies: { PLN: { name: 'Polish Złoty', symbol: 'zł' } },
    languages: { pol: 'Polish' },
    borders: ['BLR', 'CZE', 'DEU', 'LTU', 'RUS', 'SVK', 'UKR'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/pl123' }
  },
  {
    cca3: 'NGA',
    name: { common: 'Nigeria', official: 'Federal Republic of Nigeria' },
    capital: ['Abuja'],
    region: 'Africa',
    subregion: 'Western Africa',
    population: 206139587,
    area: 923768,
    flags: { png: 'https://flagcdn.w300/ng.png', svg: 'https://flagcdn.com/ng.svg' },
    currencies: { NGN: { name: 'Nigerian Naira', symbol: '₦' } },
    languages: { eng: 'English' },
    borders: ['BEN', 'CMR', 'TCD', 'NER'],
    timezones: ['UTC+01:00'],
    maps: { googleMaps: 'https://goo.gl/maps/ng123' }
  },
  {
    cca3: 'KEN',
    name: { common: 'Kenya', official: 'Republic of Kenya' },
    capital: ['Nairobi'],
    region: 'Africa',
    subregion: 'Eastern Africa',
    population: 53771300,
    area: 580367,
    flags: { png: 'https://flagcdn.w300/ke.png', svg: 'https://flagcdn.com/ke.svg' },
    currencies: { KES: { name: 'Kenyan Shilling', symbol: 'Sh' } },
    languages: { eng: 'English', swa: 'Swahili' },
    borders: ['ETH', 'SOM', 'SSD', 'TZA', 'UGA'],
    timezones: ['UTC+03:00'],
    maps: { googleMaps: 'https://goo.gl/maps/ke123' }
  }
];

async function seed() {
  console.log('Connecting to MySQL server...');
  let connection;
  try {
    const { conn, pwd } = await getWorkingConnection();
    connection = conn;

    console.log(`Creating database "${DB_NAME}" if not exists...`);
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

    console.log(`Inserting/Updating ${countriesList.length} countries into MySQL table "countries"...`);

    for (const c of countriesList) {
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
    console.log(`✅ Success! MySQL Database "${DB_NAME}" now contains ${rows[0].count} countries in table "countries".`);

  } catch (error) {
    console.error('❌ Database seed failed:', error);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

seed();
