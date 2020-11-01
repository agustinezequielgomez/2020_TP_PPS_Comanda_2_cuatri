import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../Models/Classes/client';
import { HomeScreenCards } from '../Models/Classes/home-screen-card';
import { Photo, Photos } from '../Models/Classes/photo';
import { ScannedUser, User } from '../Models/Classes/user';
import { UserRoles } from '../Models/Enums/user-roles.enum';
import { Employee } from '../Models/Classes/employee';
import { SideMenuItems } from '../Models/Classes/side-menu-item';

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
    private CurrentClientSubject: BehaviorSubject<Client> = new BehaviorSubject(null);
    public CurrentClientObservable: Observable<Client> = this.CurrentClientSubject.asObservable();

    public get CurrentClient(): Client {
      return this.CurrentClientSubject.value;
    }

    public set CurrentClient(client: Client) {
      this.CurrentClientSubject.next(client);
    }
  }();

  static Employee = new class {
    private CurrentEmployeeSubject: BehaviorSubject<Employee> = new BehaviorSubject(null);
    public CurrentEmployeeObservable: Observable<Employee> = this.CurrentEmployeeSubject.asObservable();

    public get CurrentEmployee(): Employee {
      return this.CurrentEmployeeSubject.value;
    }

    public set CurrentEmployee(employee: Employee) {
      this.CurrentEmployeeSubject.next(employee);
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
        redirectTo: 'userAdmin'
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

    public GetCards(): HomeScreenCards {
      switch (DataStoreService.User.CurrentUser.data.role) {
        case UserRoles.SUPERVISOR:
          return this.SupervisorCards;

        case UserRoles.CLIENTE:
          return this.ClientCards;

        case UserRoles.BARTENDER:
          break;

        case UserRoles.MOZO:
          break;

        case UserRoles.METRE:
          break;

        case UserRoles.COCINERO:
          break;

        case UserRoles.DUEÑO:
          break;
      }
    }
  }();

  static SideMenu = new class {
    private DisplayMenuSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public DisplayMenuObservable: Observable<boolean> = this.DisplayMenuSubject.asObservable();

    public set DisplayMenuHeader(display: boolean) {
      if (display !== this.DisplayMenuSubject.value) {
        this.DisplayMenuSubject.next(display);
      }
    }

    private SupervisorSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home'
      },
      {
        id: 1,
        label: 'Aceptar usuarios',
        redirectTo: 'userAdmin',
        icon: 'clipboard'
      }
    ];

    private ClientSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home'
      }
    ];

    private BartenderSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home'
      }
    ];

    private MozoSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home'
      }
    ];

    private MetreSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home'
      }
    ];

    private CocineroSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home'
      }
    ];

    private DueñoSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home'
      }
    ];

    public GetSideMenuItems(userRole: UserRoles): SideMenuItems {
      switch (userRole) {
        case UserRoles.SUPERVISOR:
          return this.SupervisorSideMenu;

        case UserRoles.CLIENTE:
          return this.ClientSideMenu;

        case UserRoles.BARTENDER:
          return this.BartenderSideMenu;

        case UserRoles.MOZO:
          return this.MozoSideMenu;

        case UserRoles.METRE:
          return this.MetreSideMenu;

        case UserRoles.COCINERO:
          return this.CocineroSideMenu;

        case UserRoles.DUEÑO:
          return this.DueñoSideMenu;
      }
    }
  }();
}
