// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  FCM_URL: 'https://fcm.googleapis.com/fcm/send',
  FCM_SERVER_KEY: 'AAAAg9MCrp0:APA91bHsXz7Z_kbuGDj966Jpjmqtk6x6nlAqQQRZ0na1spjrZvcoYlbt8A1pqGGyqya8sTHJHGbGlALfMPpho9chI2us2fTMUreJUyEk_Dj5ray0z3aO4dz48KDDU0lzCOguQcKhmHJm',
  firebase: {
    apiKey: "AIzaSyBYE67b5W4KofoNjBZHyK-P49GwhFvq0o0",
    authDomain: "comanda-pps.firebaseapp.com",
    databaseURL: "https://comanda-pps.firebaseio.com",
    projectId: "comanda-pps",
    storageBucket: "comanda-pps.appspot.com",
    messagingSenderId: "566180884125",
    appId: "1:566180884125:web:6579bf0ddc084994402e74"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
