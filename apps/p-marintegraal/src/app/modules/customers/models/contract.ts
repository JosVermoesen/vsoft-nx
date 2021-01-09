import { ITelebibContract } from './telebibContract';

export interface IContract {
  id: string; // police number unique
  a010: string;
  // a000: string;
  vs99?: string;
  vs98?: string;

  telebibContracts?: ITelebibContract[];
}
