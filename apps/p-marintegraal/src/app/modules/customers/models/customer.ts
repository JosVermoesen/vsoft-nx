import { ICustomerInvoice } from './customerInvoice';
import { IContract } from './contract';

export interface ICustomer {
  // MAIN
  id: string; // A110 Unique code number
  a10c: string; // Language code
  a107?: string; // Postal Code
  a108?: string; // Place
  a104?: string; // Street
  a105?: string; // Number
  a106?: string; // Box
  a109?: string; // Country code (Belgian bPost)
  a161?: string; // VAT number (BE format)
  v151?: string; // co-contractor (1=yes)
  v111?: string; // default VAT code
  v254?: string; // cloudlink (myDocuments)
  vs04?: string; // payment term
  v227?: string; // date last visit/order
  v247?: string; // (local)server guid (myDocuments)
  a10a?: string; // main phone number (fixed line)
  vs02?: string; // main fax number (fixed line)
  a123?: string; // marital status
  a124?: string; // code sex (3= legal person/rechtspersoon)
  a121?: string; // code nationality

  // FIRST PERSON

  v301?: string; // RR number1
  a102?: string; // Title code
  a100?: string; // LastName
  a101?: string; // FirstName
  v226?: string; // mobile phone number (main)
  v224?: string; // main email adress
  v243?: string; // Phone work
  v259?: string; // IBAN banc account
  v260?: string; // BIC banc account
  a170?: string; // banc account number (BE old format)

  // SECOND PERSON (PARTNER)

  v302?: string; // RR number2 (partner)
  vs01?: string; // Title code (partner)
  a125?: string; // LastName (partner)
  a127?: string; // FirstName (partner)
  v244?: string; // Mobile Phone (partner)
  v002?: string; // email2 (partner)
  v257?: string; // IBAN banc account2 (partner)
  v258?: string; // BIC banc account2 (partner)
  v251?: string; // old banc account (partner)


  g101: string; // preference documents
  // 0 = classic postal mail only
  // 1 = email PUSH
  // 2 = email PULL

  // END OF YEAR PRESENTS
  g102: string; // A 1=YES 2 or blanc=NO
  g103: string; // B 1=YES 2 or blanc=NO
  g104: string; // C 1=YES 2 or blanc=NO
  g105: string; b // D 1=YES 2 or blanc=NO

  vsoftContracts?: IContract[];
  vsoftCustomerInvoices?: ICustomerInvoice[];
}
