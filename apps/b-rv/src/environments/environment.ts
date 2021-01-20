// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  version: '11.2.0',

  // https should be http when SSL not enabled
  // marIntegraal Service Plus users can get our dotnet core api source code
  /* apiUrl: 'http://localhost:5000/api/',
  apiWhiteListDomain: ['localhost:5000'],
  apiBlackListDomain: ['localhost:5000/api/auth'], */
  apiUrl: 'https://rv-services.be/api/',
  apiWhiteListDomain: ['rv-services.be'],
  apiBlackListDomain: ['rv-services.be/api/auth'],
  // vsoft!
  contentful: {
    spaceId: 'mq8ieqd7mcv8',
    token: 'e92105b30fe907b0de47100961329d50bec5e0476f55473e1b821e4919e4a26e'
  },

  // add your apiKeys for contactmail functionality
  apiVsoftMailGuid: 'your guid',
  apiVsoftSendFromAddress: 'your mailadress',
  apiVsoftSendFromName: 'your name',

  // google meetup
  meetupCode: 'your code',
};
