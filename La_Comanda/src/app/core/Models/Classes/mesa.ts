export interface Mesa {
  cantidad_comensales: number;
  foto: string;
  numero: number;
  qr: string;
  cliente?: string;
}

export type Mesas = Mesa[];
