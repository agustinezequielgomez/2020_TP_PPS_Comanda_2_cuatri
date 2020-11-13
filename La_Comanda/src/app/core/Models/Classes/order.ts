import { Alimento } from './alimento';
export interface Order {
  orderId: string;
  items: Alimento[];
  totalPrice: number;
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
  ENTREGADO = 'ENTREGADO',
}
