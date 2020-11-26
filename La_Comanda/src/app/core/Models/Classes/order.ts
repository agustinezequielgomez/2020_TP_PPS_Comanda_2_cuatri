import { Alimento } from './alimento';
export interface Order {
  orderId: string;
  items: Alimento[];
  totalPrice: number;
  totalPaid?: number;
  client: string;
  estimated_time: number;
  ordered_at: Date;
  tableId: number;
  state: OrderState;
}

export enum OrderState {
  PEDIDO = 'PEDIDO',
  CONFIRMADO = 'CONFIRMADO',
  EN_PROGRESO = 'EN_PROGRESO',
  TERMINADO = 'TERMINADO',
  ENTREGADO_CONFIRMACION = 'ENTREGADO_CONFIRMACION',
  ENTREGADO = 'ENTREGADO',
  PAGADO = 'PAGADO',
  CERRADO = 'CERRADO',
}
