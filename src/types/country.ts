export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  borders?: string[];
  timezones?: string[];
  maps?: {
    googleMaps?: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
}
