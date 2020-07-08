/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,

  firebase: {
    apiKey: "AIzaSyAveLds-NKQXtjEklUmnopr2gtsovzUo4o",
    authDomain: "rasp-pi12345.firebaseapp.com",
    databaseURL: "https://rasp-pi12345.firebaseio.com",
    projectId: "rasp-pi12345",
    storageBucket: "rasp-pi12345.appspot.com",
    messagingSenderId: "454450314706",
    appId: "1:454450314706:web:ef88b66cbb8a616b9f9c0b"
  }
};
