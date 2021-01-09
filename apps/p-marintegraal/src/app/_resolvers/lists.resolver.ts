import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;
  likesParam = 'Likers';

  constructor(
    private as: AlertifyService,
    private uS: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.uS
      .getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
      .pipe(
        catchError(error => {
          this.as.error('Problem retrieving data from members list');
          this.router.navigate(['/z/menu']);
          return of(null);
        })
      );
  }
}
