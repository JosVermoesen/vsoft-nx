import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '../../../_services/alertify.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ISupplier } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';

@Injectable()
export class SupplierDetailResolver implements Resolve<ISupplier> {
  constructor(
    private supplierService: SupplierService,
    private alertService: AlertifyService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplier> {
    return this.supplierService.getSupplier(route.params.id).pipe(
      catchError(error => {
        this.translateService.get('SUPPLIERS.detailsRole').subscribe((res: string) => {
          this.alertService.error(res);
        });
        this.router.navigate(['/suppliers/list']);
        return of(null);
      })
    );
  }
}
