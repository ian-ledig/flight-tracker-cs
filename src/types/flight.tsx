export interface Flight {
  airlineIata: string;
  flightNumber: string;
  depIata: string;
  arrIata: string;
  duration: number;
  depScheduled: string;
  arrScheduled: string;
  depEstimated: string;
  arrEstimated: string;
  aircraftIata: string;
  depLat: number;
  depLng: number;
  arrLat: number;
  arrLng: number;
  status: string;
}
