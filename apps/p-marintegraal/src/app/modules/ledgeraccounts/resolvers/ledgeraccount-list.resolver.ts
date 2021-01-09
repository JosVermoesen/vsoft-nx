import { TranslateService } from '@ngx-translate/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../../../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LedgerAccountService } from '../services/ledgeraccount.service';
import { ILedgerAccount } from '../models/ledgerAccount';

@Injectable()
export class LedgerAccountListResolver implements Resolve<ILedgerAccount[]> {
  pageSize = 5;
  pageNumber = 1;

  constructor(
    private as: AlertifyService,
    private laS: LedgerAccountService,
    private ts: TranslateService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILedgerAccount[]> {
    return this.laS.getLedgerAccounts(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.ts.get('ACCOUNTS.listRole').subscribe((res: string) => {
          this.as.error(res);
        });
        this.router.navigate(['/z/menu']);
        return of(null);
      })
    );
  }
}
