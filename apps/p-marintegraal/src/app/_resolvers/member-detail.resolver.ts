import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private as: AlertifyService,
    private uS: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.uS.getUser(route.params.id).pipe(
      catchError(error => {
        this.as.error('Problem retrieving data for member details');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
