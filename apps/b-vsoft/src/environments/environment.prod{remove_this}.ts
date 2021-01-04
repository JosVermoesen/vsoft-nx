// please rename environment.prod$.ts to environment.prod.ts
export const environment = {
  production: true,

  // marIntegraal users are allowed to use our server
  apiUrl: 'https://rv-services.be/api/',
  apiWhiteListDomain: ['rv-services.be'],
  apiBlackListDomain: ['rv-services.be/api/auth'],

  // add your apiKeys for contactmail functionality
  apiVsoftMailGuid: 'place your key here!',
  apiVsoftSendFromAddress: 'companymail@yourdomainname.be',
  apiVsoftSendFromName: 'Your company or organisation name',

  // vsoft contentful api
  contentful: {
    spaceId: 'mq8ieqd7mcv8',
    token: 'e92105b30fe907b0de47100961329d50bec5e0476f55473e1b821e4919e4a26e'
  }
};
