import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo, Photos } from '../Models/Classes/photo';
import { TestUsers, TestUser } from '../Models/Classes/test-user';
import { User } from '../Models/Classes/user';
import { Client } from '../Models/Classes/client';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  constructor() { }

  static Configuration = new class {
    private FullScreen: BehaviorSubject<boolean> = new BehaviorSubject(null);
    private DeviceTokenSubject: BehaviorSubject<string> = new BehaviorSubject(null);

    public get IsFullScreen(): boolean {
      return this.FullScreen.value;
    }

    public set SetFullScreen(value: boolean) {
      this.FullScreen.next(value);
    }

    public set DeviceToken(token: string) {
      this.DeviceTokenSubject.next(token);
    }
  }();

  static Access = new class {
    private TestUserSubject: BehaviorSubject<TestUser> = new BehaviorSubject(null);
    public TestUserObservable: Observable<TestUser> = this.TestUserSubject.asObservable();

    public get TestUser(): TestUser {
      return this.TestUserSubject.value;
    }
    public set TestUser(user: TestUser) {
      this.TestUserSubject.next(user);
    }

    public get TestUsers(): TestUsers {
      return [
        {id: 1, correo: 'admin@admin.com', clave: 111111, perfil: 'admin', sexo: 'femenino'},
        {id: 2, correo: 'invitado@invitado.com', clave: 222222, perfil: 'invitado', sexo: 'femenino'},
        {id: 3, correo: 'usuario@usuario.com', clave: 333333, perfil: 'usuario', sexo: 'masculino'},
        {id: 4, correo: 'anonimo@anonimo.com', clave: 444444, perfil: 'usuario', sexo: 'masculino'},
        {id: 5, correo: 'tester@tester.com', clave: 555555, perfil: 'tester', sexo: 'femenino'}
      ];
    }
  }();

  static User = new class {
    private CurrentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
    public CurrentUserObservable: Observable<User> = this.CurrentUserSubject.asObservable();

    public get CurrentUser(): User {
      return this.CurrentUserSubject.value;
    }

    public set CurrentUser(user: User) {
      this.CurrentUserSubject.next(user);
    }
  }();

  static Notification = new class<T> {
    private NotificationTokenSubject: BehaviorSubject<string> = new BehaviorSubject(null);
    public NotificationTokenObservable: Observable<string> = this.NotificationTokenSubject.asObservable();

    private NotificationDataSubject: BehaviorSubject<T> = new BehaviorSubject(null);
    public NotificationDataObservable: Observable<T> = this.NotificationDataSubject.asObservable();

    public get NotificationToken(): string {
      return this.NotificationTokenSubject.value;
    }

    public set NotificationToken(token: string) {
      this.NotificationTokenSubject.next(token);
    }

    public get NotificationData(): T {
      return this.NotificationDataSubject.value;
    }

    public set NotificationData(data: T) {
      this.NotificationDataSubject.next(data);
    }
  }();

  static Client = new class {
    private RegisteredClientSubject: BehaviorSubject<Client> = new BehaviorSubject(null);
    public RegisteredClientObservable: Observable<Client> = this.RegisteredClientSubject.asObservable();

    public get RegisteredClient(): Client {
      return this.RegisteredClientSubject.value;
    }

    public set RegisteredClient(client: Client) {
      this.RegisteredClientSubject.next(client);
    }
  }();

  static Various = new class {
    private CapturedPhotosSubject: BehaviorSubject<Photos> = new BehaviorSubject([]);
    public CapturedPhotosObservable: Observable<Photos> = this.CapturedPhotosSubject.asObservable();

    public set CapturedPhotos(photos: Photos) {
      this.CapturedPhotosSubject.next(photos);
    }

    public set AddCapturedPhoto(photo: Photo) {
      this.CapturedPhotosSubject.next([...this.CapturedPhotosSubject.value, photo]);
    }

    public get CapturedPhotos(): Photos {
      return this.CapturedPhotosSubject.value;
    }
  }();
}
