import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../../../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { debug } from 'util';
import { ILedgerAccount } from '../models/ledgerAccount';
import { LedgerAccountService } from '../services/ledgeraccount.service';

@Injectable()
export class LedgerAccountEditResolver implements Resolve<ILedgerAccount> {
  constructor(
    private as: AlertifyService,
    private laS: LedgerAccountService,
    private ts: TranslateService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILedgerAccount> {
    return this.laS.getLedgerAccount(route.params.id).pipe(
      catchError(error => {
        this.ts.get('ACCOUNTS.editRole').subscribe((res: string) => {
          this.as.error(res);
        });
        this.router.navigate(['/ledgeraccounts/list']);
        return of(null);
      })
    );
  }
}
