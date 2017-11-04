// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBPX5UnZYgccgbqrAipQOhsc8chEUbRwVc",
    authDomain: "faea-eventos.firebaseapp.com",
    databaseURL: "https://faea-eventos.firebaseio.com",
    projectId: "faea-eventos",
    storageBucket: "faea-eventos.appspot.com",
    messagingSenderId: "966324489874"
  }
};