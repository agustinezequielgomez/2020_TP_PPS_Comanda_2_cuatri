export interface Reservation {
  ID: string;
  clientName: string;
  clientId: string;
  tableId: string;
  tableNumber: number;
  date: Date | string;
}
