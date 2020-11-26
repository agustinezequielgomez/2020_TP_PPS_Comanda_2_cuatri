export interface TestUser {
  id: number;
  correo: string;
  clave: number;
  perfil: string;
  sexo: 'masculino' | 'femenino';
}

export declare type TestUsers = TestUser[];
