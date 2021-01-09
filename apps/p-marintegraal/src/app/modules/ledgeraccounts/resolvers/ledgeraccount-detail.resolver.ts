import { TranslateService } from '@ngx-translate/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ILedgerAccount } from '../models/ledgerAccount';
import { LedgerAccountService } from '../services/ledgeraccount.service';
import { AlertifyService } from '../../../_services/alertify.service';

@Injectable()
export class LedgerAccountDetailResolver implements Resolve<ILedgerAccount> {
  constructor(
    private as: AlertifyService,
    private ts: TranslateService,
    private laS: LedgerAccountService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILedgerAccount> {
    return this.laS.getLedgerAccount(route.params.id).pipe(
      catchError(error => {
        // {{ 'ACCOUNTS.editRole' | translate }}
        // {{ 'ACCOUNTS.listRole' | translate }}
        // {{ 'ACCOUNTS.detailsRole' | translate }}
        this.ts.get('ACCOUNTS.detailsRole').subscribe((res: string) => {
          this.as.error(res);
        });
        this.router.navigate(['/ledgeraccounts/list']);
        return of(null);
      })
    );
  }
}
