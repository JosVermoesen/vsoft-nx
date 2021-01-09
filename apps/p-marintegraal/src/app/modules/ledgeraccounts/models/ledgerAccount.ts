import { ILedger } from './ledger';

export interface ILedgerAccount {
  id: string; // v019 Unique account number conform M.A.R.
  v020: string; // Description account
  dece022: number; // booking year
  dece023: number; // booking year-1
  dece024: number; // booking year-2
  dece025: number; // booking year-3
  dece026: number; // booking year-4
  dece027: number; // booking year-5
  dece028: number; // booking year-6
  dece029: number; // booking year-7
  dece030: number; // booking year-8
  dece031: number; // booking year-9
  dece999: number; // dummy voor test!!!!!
  v021: string; // verdeelsleutel
  v032: string; // Budget Flag
  v216: string; // Forfait cumulator

  ledgers?: ILedger[];
}
