// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /* apiUrl: 'http://localhost:5000/api/',
  apiWhiteListDomain: ['localhost:5000'],
  apiBlackListDomain: ['localhost:5000/api/auth'] */
  apiUrl: 'https://rv-services.be/api/',
  apiWhiteListDomain: ['rv-services.be'],
  apiBlackListDomain: ['rv-services.be/api/auth'],

  // add your apiKeys for contactmail functionality
  apiVsoftMailGuid: '',
  apiVsoftSendFromAddress: '',
  apiVsoftSendFromName: ''
};
