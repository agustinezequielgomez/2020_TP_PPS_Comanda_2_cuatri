import { Reservation } from './reservation';

export interface Mesa {
  cantidad_comensales: number;
  foto: string;
  numero: number;
  qr: string;
  cliente?: string;
  reservations?: Reservation[];
}

export interface DBMesaDocument {
  mesa: Mesa;
}

export type Mesas = Mesa[];
