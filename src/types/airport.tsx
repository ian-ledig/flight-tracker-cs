export interface Airport {
  name: string;
  lat: number;
  lng: number;
}

export interface Airports {
  [key: string]: Airport | undefined;
}
