import { TranslateService } from '@ngx-translate/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../../../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ISupplier } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';

@Injectable()
export class SupplierListResolver implements Resolve<ISupplier[]> {
  pageSize = 5;
  pageNumber = 1;

  constructor(
    private alertService: AlertifyService,
    private supplierService: SupplierService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplier[]> {
    return this.supplierService.getSuppliers(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.translateService.get('SUPPLIERS.listRole').subscribe((res: string) => {
          this.alertService.error(res);
        });
        this.router.navigate(['/z/menu']);
        return of(null);
      })
    );
  }
}
