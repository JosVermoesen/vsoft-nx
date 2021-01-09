import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ICustomer } from '../models/customer';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CustomerEditResolver implements Resolve<ICustomer> {
  constructor(
    private alertService: AlertifyService,
    private customerService: CustomerService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomer> {
    return this.customerService.getCustomer(route.params.id).pipe(
      catchError(error => {
        this.translateService.get('CUSTOMERS.editRole').subscribe((res: string) => {
          this.alertService.error(res);
        });
        this.router.navigate(['/customers/list']);
        return of(null);
      })
    );
  }
}
