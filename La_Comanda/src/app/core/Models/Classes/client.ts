import { User } from './user';

export interface Client extends User {
    enabled: boolean;
    isAnonymous: boolean;
}
