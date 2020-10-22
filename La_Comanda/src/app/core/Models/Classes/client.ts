import { User } from './user';

export interface Client extends User {
}

export interface ClientDBDocument {
    client: Client;
}
