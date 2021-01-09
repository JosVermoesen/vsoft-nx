import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ISupplier } from '../models/supplier';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../../../_services/alertify.service';
// import { debug } from 'util';

@Injectable()
export class SupplierEditResolver implements Resolve<ISupplier> {
  constructor(
    private alertService: AlertifyService,
    private supplierService: SupplierService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplier> {
    return this.supplierService.getSupplier(route.params.id).pipe(
      catchError(error => {
        this.translateService.get('SUPPLIERS.editRole').subscribe((res: string) => {
          this.alertService.error(res);
        });
        this.router.navigate(['/suppliers/list']);
        return of(null);
      })
    );
  }
}
