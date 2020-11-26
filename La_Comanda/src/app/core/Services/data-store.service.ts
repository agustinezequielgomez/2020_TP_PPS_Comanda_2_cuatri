import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client, ClientState } from '../Models/Classes/client';
import { Employee } from '../Models/Classes/employee';
import { HomeScreenCards, HomeScreenCard } from '../Models/Classes/home-screen-card';
import { Photo, Photos } from '../Models/Classes/photo';
import { SideMenuItem, SideMenuItems } from '../Models/Classes/side-menu-item';
import { ScannedUser, User } from '../Models/Classes/user';
import { UserRoles } from '../Models/Enums/user-roles.enum';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  constructor() {}

  static Configuration = new (class {
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
  })();

  static Access = new (class {
    public QuickUserSelectedSubject: BehaviorSubject<User> = new BehaviorSubject(null);
    public QuickUserSelectedObservable: Observable<User> = this.QuickUserSelectedSubject.asObservable();

    public get QuickUser(): User {
      return this.QuickUserSelectedSubject.value;
    }

    public set QuickUser(user: User) {
      this.QuickUserSelectedSubject.next(user);
    }
  })();

  static User = new (class {
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
  })();

  static Notification = new (class<T> {
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
  })();

  static Client = new (class {
    private CurrentClientSubject: BehaviorSubject<Client> = new BehaviorSubject(null);
    public CurrentClientObservable: Observable<Client> = this.CurrentClientSubject.asObservable();

    public get CurrentClient(): Client {
      return this.CurrentClientSubject.value;
    }

    public set CurrentClient(client: Client) {
      this.CurrentClientSubject.next(client);
    }
  })();

  static Employee = new (class {
    private CurrentEmployeeSubject: BehaviorSubject<Employee> = new BehaviorSubject(null);
    public CurrentEmployeeObservable: Observable<Employee> = this.CurrentEmployeeSubject.asObservable();

    public get CurrentEmployee(): Employee {
      return this.CurrentEmployeeSubject.value;
    }

    public set CurrentEmployee(employee: Employee) {
      this.CurrentEmployeeSubject.next(employee);
    }
  })();

  static Various = new (class {
    private CapturedPhotosSubject: BehaviorSubject<Photos> = new BehaviorSubject([]);
    public CapturedPhotosObservable: Observable<Photos> = this.CapturedPhotosSubject.asObservable();

    private PlaySoundSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
    public PlaySoundObservable: Observable<boolean> = this.PlaySoundSubject.asObservable();

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

    public TogglePlaySound() {
      this.PlaySoundSubject.next(!this.PlaySoundSubject.value);
    }

    public async PlayLoginSound() {
      if (this.PlaySoundSubject.value) {
        const loginSound = new Audio('assets/login.mp3');
        loginSound.playbackRate = 5;
        loginSound.load();
        loginSound.play();
      }
    }
  })();

  static Cards = new (class {
    private SupervisorCards: HomeScreenCards = [
      {
        title: 'Aceptar usuarios',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: 'userAdmin',
      },
      {
        title: 'Confirmar reservación',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/reservation.png',
        redirectTo: 'confirmReservation',
      },
      {
        title: 'Alta de empleado',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/alta_empleado.png',
        redirectTo: 'empleado',
      },
      {
        title: 'Alta de mesa',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/alta_mesa.png',
        redirectTo: 'mesa',
      },
    ];

    private DueñoCards: HomeScreenCards = [
      {
        title: 'Aceptar usuarios',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/accept_user.png',
        redirectTo: 'userAdmin',
      },
      {
        title: 'Confirmar reservación',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/reservation.png',
        redirectTo: 'confirmReservation',
      },
      {
        title: 'Alta de empleado',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/alta_empleado.png',
        redirectTo: 'empleado',
      },
    ];

    private MozoCards: HomeScreenCards = [
      {
        title: 'Confirmar pedido',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/confirmar_pedido.png',
        redirectTo: 'reviewOrder',
      },
      {
        title: 'Contestar consultas',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/consulta.png',
        redirectTo: 'waiterQuestion',
      },
      {
        title: 'Entregar pedido',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/table.png',
        redirectTo: 'deliverOrder',
      },
      {
        title: 'Confirmar pago',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/pay.png',
        redirectTo: 'confirmPayment',
      },
    ];

    private ClientCardsNulo: HomeScreenCards = [
      {
        title: 'Entrar a lista de espera',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/queue.png',
        redirectTo: 'waitingListEnter',
      },
    ];

    private ReservationCard: HomeScreenCard = {
      title: 'Reservar mesa',
      color: 'primary',
      imgPath: 'assets/home-screen-cards/reservation.png',
      redirectTo: 'reserve',
    };

    private ClientCardsListaDeEspera: HomeScreenCards = [
      {
        title: 'Ocupar mesa',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/table.png',
        redirectTo: 'clientTable',
      },
    ];

    private ClientCardsEnMesa: HomeScreenCards = [
      {
        title: 'Ver menu',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/hamburguer.png',
        redirectTo: 'foodMenu',
      },
      {
        title: 'Hacer pedido',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/food-list.png',
        redirectTo: 'clientTable',
      },
      {
        title: 'Consulta al mozo',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/consulta.png',
        redirectTo: 'clientTable?question=true',
      },
    ];

    private ClientCardsEsperandoPedido: HomeScreenCards = [
      {
        title: 'Ver menu',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/hamburguer.png',
        redirectTo: 'foodMenu',
      },
      {
        title: 'Consultá el estado del pedido',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/time.png',
        redirectTo: 'clientTable?orderState=true',
      },
      {
        title: 'Consultá al mozo',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/consulta.png',
        redirectTo: 'clientTable?question=true',
      },
      {
        title: 'Encuesta de satisfacción',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/review.png',
        redirectTo: 'clientTable?review=true',
      },
    ];

    private ClientCardsComiendo: HomeScreenCards = [
      {
        title: 'Consultá el estado del pedido',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/time.png',
        redirectTo: 'clientTable?orderState=true',
      },
      {
        title: 'Encuesta de satisfacción',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/review.png',
        redirectTo: 'clientTable?review=true',
      },
      {
        title: 'Pedir cuenta',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/pay.png',
        redirectTo: 'clientTable?pay=true',
      },
    ];

    private MetreCards: HomeScreenCards = [
      {
        title: 'Asignar mesa a cliente',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/table.png',
        redirectTo: 'assingTable',
      },
    ];

    private CocineroCards: HomeScreenCards = [
      {
        title: 'Preparar comidas',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/prepare_food.png',
        redirectTo: 'prepareFood',
      },
      {
        title: 'Alta de comida',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/alta_comida.png',
        redirectTo: 'comida',
      },
    ];

    private BartenderCards: HomeScreenCards = [
      {
        title: 'Preparar bebida',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/prepare_drinks.png',
        redirectTo: 'prepareFood',
      },
      {
        title: 'Alta de bebida',
        color: 'primary',
        imgPath: 'assets/home-screen-cards/alta_bebida.png',
        redirectTo: 'bebida',
      },
    ];

    public GetCards(): HomeScreenCards {
      switch (DataStoreService.User.CurrentUser.data.role) {
        case UserRoles.SUPERVISOR:
          return this.SupervisorCards;

        case UserRoles.CLIENTE:
          switch (DataStoreService.Client.CurrentClient.state) {
            case ClientState.NULO:
              if (DataStoreService.Client.CurrentClient.email !== null) {
                return [...this.ClientCardsNulo, this.ReservationCard];
              }
              return this.ClientCardsNulo;

            case ClientState.EN_LISTA_DE_ESPERA:
            case ClientState.MESA_ASIGNADA:
              return this.ClientCardsListaDeEspera;

            case ClientState.EN_MESA:
              return this.ClientCardsEnMesa;

            case ClientState.ESPERANDO_PEDIDO:
              return this.ClientCardsEsperandoPedido;

            case ClientState.COMIENDO:
              return this.ClientCardsComiendo;
          }
          break;

        case UserRoles.BARTENDER:
          return this.BartenderCards;

        case UserRoles.BARTENDER:
          return this.BartenderCards;

        case UserRoles.MOZO:
          return this.MozoCards;

        case UserRoles.METRE:
          return this.MetreCards;

        case UserRoles.COCINERO:
          return this.CocineroCards;

        case UserRoles.DUEÑO:
          return this.DueñoCards;
          break;
      }
    }
  })();

  static SideMenu = new (class {
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
        icon: 'home',
      },
      {
        id: 1,
        label: 'Aceptar usuarios',
        redirectTo: 'userAdmin',
        icon: 'clipboard',
      },
      {
        id: 2,
        label: 'Confirmar reservación',
        redirectTo: 'confirmReservation',
        icon: 'calendar',
      },
      {
        id: 3,
        label: 'Alta de empleado',
        redirectTo: 'empleado',
        icon: 'person-add',
      },
      {
        id: 4,
        label: 'Alta de mesa',
        redirectTo: 'mesa',
        icon: 'easel',
      },
    ];

    private ClientSideMenuNulo: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Entrar a lista de espera',
        redirectTo: 'waitingListEnter',
        icon: 'list',
      },
    ];

    private ClientReservationSideMenuItem: SideMenuItem = {
      id: 2,
      label: 'Reservar mesa',
      redirectTo: 'reserve',
      icon: 'calendar',
    };

    private ClientSideMenuListaDeEspera: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Ocupar mesa',
        redirectTo: 'clientTable',
        icon: 'list',
      },
    ];

    private ClientSideMenuEnMesa: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Ver menu',
        redirectTo: 'foodMenu',
        icon: 'fast-food',
      },
      {
        id: 2,
        label: 'Hacer pedido',
        redirectTo: 'clientTable',
        icon: 'restaurant',
      },
      {
        id: 3,
        label: 'Consulta al mozo',
        redirectTo: 'clientTable?question=true',
        icon: 'chatbubbles',
      },
    ];

    private ClientSideMenuEsperandoPedido: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Ver menu',
        redirectTo: 'foodMenu',
        icon: 'fast-food',
      },
      {
        id: 2,
        label: 'Estado del pedido',
        redirectTo: 'clientTable?orderState=true',
        icon: 'timer',
      },
      {
        id: 3,
        label: 'Consulta al mozo',
        redirectTo: 'clientTable?question=true',
        icon: 'chatbubbles',
      },
      {
        id: 4,
        label: 'Encuesta',
        redirectTo: 'clientTable?review=true',
        icon: 'star-half',
      },
    ];

    private ClientSideMenuComiendo: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Estado del pedido',
        redirectTo: 'clientTable?orderState=true',
        icon: 'timer',
      },
      {
        id: 2,
        label: 'Encuesta',
        redirectTo: 'clientTable?review=true',
        icon: 'star-half',
      },
      {
        id: 3,
        label: 'Pedir cuenta',
        redirectTo: 'clientTable?pay=true',
        icon: 'card',
      },
    ];

    private BartenderSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Preparar bebidas',
        redirectTo: 'prepareFood',
        icon: 'wine',
      },
      {
        id: 2,
        label: 'Alta de bebida',
        redirectTo: 'bebida',
        icon: 'beer',
      },
    ];

    private MozoSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Contestar consultas',
        redirectTo: 'waiterQuestion',
        icon: 'chatbubbles',
      },
      {
        id: 2,
        label: 'Entregar pedido',
        redirectTo: 'deliverOrder',
        icon: 'restaurant',
      },
      {
        id: 3,
        label: 'Confirmar pago',
        redirectTo: 'confirmPayment',
        icon: 'card',
      },
    ];

    private MetreSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Asignar mesa',
        redirectTo: 'assingTable',
        icon: 'person-add',
      },
    ];

    private CocineroSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Preparar comidas',
        redirectTo: 'prepareFood',
        icon: 'pizza',
      },
      {
        id: 2,
        label: 'Alta de comida',
        redirectTo: 'comida',
        icon: 'fast-food',
      },
    ];

    private DueñoSideMenu: SideMenuItems = [
      {
        id: 0,
        label: 'Inicio',
        redirectTo: 'home',
        icon: 'home',
      },
      {
        id: 1,
        label: 'Aceptar usuarios',
        redirectTo: 'userAdmin',
        icon: 'clipboard',
      },
      {
        id: 2,
        label: 'Confirmar reservación',
        redirectTo: 'confirmReservation',
        icon: 'calendar',
      },
      {
        id: 3,
        label: 'Alta de empleado',
        redirectTo: 'empleado',
        icon: 'person-add',
      },
    ];

    public GetSideMenuItems(userRole: UserRoles): SideMenuItems {
      switch (userRole) {
        case UserRoles.SUPERVISOR:
          return this.SupervisorSideMenu;

        case UserRoles.CLIENTE:
          switch (DataStoreService.Client.CurrentClient.state) {
            case ClientState.NULO:
              if (DataStoreService.Client.CurrentClient.email !== null) {
                return [...this.ClientSideMenuNulo, this.ClientReservationSideMenuItem];
              }
              return this.ClientSideMenuNulo;

            case ClientState.EN_LISTA_DE_ESPERA:
            case ClientState.MESA_ASIGNADA:
              return this.ClientSideMenuListaDeEspera;

            case ClientState.EN_MESA:
              return this.ClientSideMenuEnMesa;

            case ClientState.ESPERANDO_PEDIDO:
              return this.ClientSideMenuEsperandoPedido;

            case ClientState.COMIENDO:
              return this.ClientSideMenuComiendo;
          }
          break;

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
  })();
}
