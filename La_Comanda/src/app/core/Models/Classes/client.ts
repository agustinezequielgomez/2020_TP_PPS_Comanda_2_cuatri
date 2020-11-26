import { User } from './user';

export interface Client extends User {
  enabled: boolean;
  isAnonymous: boolean;
  tableId?: number;
  state: ClientState;
  orderId?: string;
}

export enum ClientState {
  NULO = 'nulo',
  EN_LISTA_DE_ESPERA = 'en_lista_de_espera',
  MESA_ASIGNADA = 'mesa_asginada',
  EN_MESA = 'en_mesa',
  ESPERANDO_PEDIDO = 'esperando_pedido',
  COMIENDO = 'comiendo',
}
