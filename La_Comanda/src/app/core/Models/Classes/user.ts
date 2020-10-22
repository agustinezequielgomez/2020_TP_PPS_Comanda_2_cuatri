export interface User {
    ID?: number;
    UID: string;
    email: string;
    password: string;
    token: string;
    refreshToken: string;
    photoUrl: string;
    data?: UserInformation;
}

export interface UserInformation {
    role: string;
    deviceToken: string;
}

export interface DBUserDocument {
    user: User;
}

export type Users = User[];
