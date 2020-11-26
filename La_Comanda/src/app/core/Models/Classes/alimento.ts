export interface Alimento {
  descripcion: string;
  fotos: Array<string>;
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
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface DBAlimentoDocument {
  alimento: Alimento;
}
