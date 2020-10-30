import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../Models/Classes/client';
import { HomeScreenCards } from '../Models/Classes/home-screen-card';
import { Photo, Photos } from '../Models/Classes/photo';
import { ScannedUser, User } from '../Models/Classes/user';
import { UserRoles } from '../Models/Enums/user-roles.enum';

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
    public QuickUserSelectedSubject: BehaviorSubject<User> = new BehaviorSubject(null);
    public QuickUserSelectedObservable: Observable<User> = this.QuickUserSelectedSubject.asObservable();

    public get QuickUser(): User {
      return this.QuickUserSelectedSubject.value;
    }

    public set QuickUser(user: User) {
      this.QuickUserSelectedSubject.next(user);
    }
  }();

  static User = new class {
    private CurrentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
    public CurrentUserObservable: Observable<User> = this.CurrentUserSubject.asObservable();

    private ScannedUserSubject: BehaviorSubject<ScannedUser> = new BehaviorSubject(null);
    public ScannedUserObservable: Observable<ScannedUser> = this.ScannedUserSubject.asObservable();

    public get CurrentUser(): User {
      return this.CurrentUserSubject.value;
    }

    public set CurrentUser(user: User) {
      this.CurrentUserSubject.next(user);
    }

    public get ScannedUser(): ScannedUser {
      return this.ScannedUserSubject.value;
    }

    public set ScannedUser(user: ScannedUser) {
      this.ScannedUserSubject.next(user);
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
      console.log('photo added');
      this.CapturedPhotosSubject.next(photos);
    }

    public set AddCapturedPhoto(photo: Photo) {
      console.log('photo added');
      this.CapturedPhotosSubject.next([...this.CapturedPhotosSubject.value, photo]);
    }

    public get CapturedPhotos(): Photos {
      return this.CapturedPhotosSubject.value;
    }
  }();

  static Cards = new class {
    private SupervisorCards: HomeScreenCards = [
      {
        title: 'Aceptar usuarios',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: ''
      },
      {
        title: 'Aceptar usuarios',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: ''
      },
      {
        title: 'Aceptar usuarios',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: ''
      },
      {
        title: 'Aceptar usuarios',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: ''
      }
    ];

    private ClientCards: HomeScreenCards = [
      {
        title: 'TEST CARD',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: ''
      },
      {
        title: 'TEST CARD',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: ''
      },
      {
        title: 'TEST CARD',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: ''
      },
      {
        title: 'TEST CARD',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: ''
      }
    ];

    public GetCards(role: UserRoles): HomeScreenCards {
      switch (role) {
        case UserRoles.SUPERVISOR:
          return this.SupervisorCards;

        case UserRoles.CLIENTE:
          return this.ClientCards;
      }
    }
  }();
}
