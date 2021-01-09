import { Photo } from './photo';

export interface User {
  id: number;
  userName: string;
  knownAs: string;
  age: number;
  gender: string;
  email: string;
  phoneNumber: string;
  created: Date;
  lastActive: any;
  photoUrl: string;
  city: string;
  country: string;
  gdpr?: string;
  introduction?: string;
  lookingFor?: string;
  berNumber?: string;
  clientNumber?: string;
  photos?: Photo[];
  roles?: string[];
}
