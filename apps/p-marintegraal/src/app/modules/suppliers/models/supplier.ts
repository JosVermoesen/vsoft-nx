import { ISupplierInvoice } from './supplierInvoice';

export interface ISupplier {
  id: string; // A110 Unique code number
  a102: string; // Title code
  a100: string; // Name 1
  vs01: string; // Title code 2
  a125: string; // Name 2
  a10c: string; // Language code
  a104: string; // Street
  a105: string; // Number
  a106: string; // Box
  a107: string; // Postal code
  a108: string; // Place
  v149: string; // ISO Country NUMBER
  a109: string; // Country code Postoffice
  v150: string; // ISO Country CODE
  vs03: string; // ISO Currency code
  a10a: string; // Phone number
  vs02: string; // Fax
  v224: string; // Email
  v163: string; // connection for stock
  v016: string; // connection for 6-costaccount
  v161: string; // connection for 44-account
  a161: string; // VAT number
  a170: string; // belgian fin. account old format
  v259: string; // fin. account IBAN format
  v260: string; // fin. account BIC
  a400: string; // fixed ref/agent number
  v015: string; // registration number
  v151: string; // medecontractant
  v111: string; // default VAT code
  vs04: string; // payment delay days
  v017: string; // aardcode gestruct. mededeling
  v018: string; // streefomzet
  v001: string; // Picture
  v002: string; // Video file
  v226: string; // Mobile Phone number
  v227: string; // Date last visit
  v247: string; // Opmerkingen
  v254: string; // SQL aankoopverrichting
  decv018?: string; // streefomzet
  v255: string; // ?
  v256: string; // ?
  v262: string; // ?

  supplierInvoices?: ISupplierInvoice[];
}
