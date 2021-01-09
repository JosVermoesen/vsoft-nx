import { TranslateService } from '@ngx-translate/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../../../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ICustomer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class CustomerListResolver implements Resolve<ICustomer[]> {
  pageSize = 5;
  pageNumber = 1;

  constructor(
    private alertService: AlertifyService,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomer[]> {
    return this.customerService.getCustomers(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.translateService.get('CUSTOMERS.listRole').subscribe((res: string) => {
          this.alertService.error(res);
        });
        this.router.navigate(['/z/menu']);
        return of(null);
      })
    );
  }
}
