// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/* Firebase*/
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCt5oPtp8P7tT4LbP3jxTvjUqiHRfxek5o',
    authDomain: 'clashevents-c63f8.firebaseapp.com',
    databaseURL: 'https://clashevents-c63f8.firebaseio.com',
    projectId: 'clashevents-c63f8',
    storageBucket: 'clashevents-c63f8.appspot.com',
    messagingSenderId: '245443452071',
    appId: '1:245443452071:web:ff79dfcf553076917a8f82',
    measurementId: 'G-J6K99JLP9J'
  }
};
