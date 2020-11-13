export interface Alimento {
  descripcion: string;
  fotos: string[3];
  nombre: string;
  precio: number;
  qr: string;
  tiempo_elaboracion?: number;
  tipo: TipoAlimento;
  estado_preparacion?: FoodState;
}

export enum TipoAlimento {
  COMIDA = 'comida',
  BEBIDA = 'bebida',
}

export enum FoodState {
  TODO = 'Por hacer',
  IN_PROGRESS = 'En progreso',
  COMPLETED = 'Completado',
}
