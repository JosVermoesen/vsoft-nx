import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICustomer } from '../models/customer';
import { PaginatedResult } from '../../../_models/pagination';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { UIService } from '../_shared/ui.service';

@Injectable()
export class CustomerService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: HttpClient) {}

  getCustomers(page?, itemsPerPage?, customerParams?) {
    const paginatedResult: PaginatedResult<
      ICustomer[]
    > = new PaginatedResult<ICustomer[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (customerParams != null) {
      params = params.append('minA107', customerParams.minA107);
      params = params.append('maxA107', customerParams.maxA107);
    }

    return this.authHttp
      .get<ICustomer[]>(this.baseUrl + 'vsoftcustomers', {
        observe: 'response',
        params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getCustomer(id): Observable<ICustomer> {
    return this.authHttp.get<ICustomer>(
      this.baseUrl + 'vsoftcustomers/' + id
    );
  }

  getVsoftCustomersWithMail(): Observable<ICustomer[]> {
    return this.authHttp.get<ICustomer[]>(
      this.baseUrl + 'vsoftcustomers/withmail'
    );
  }

  newCustomer(customer: ICustomer) {
    // this.uiService.loadingStateChanged.next(true);
    return this.authHttp.post(
      this.baseUrl + 'vsoftcustomers/customercreate',
      customer,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    );
  }

  updateCustomer(customer: ICustomer) {
    return this.authHttp.put(
      this.baseUrl + 'vsoftcustomers/updatecustomer',
      customer
    );
  }

  // TODO IF NEEDED:
  /* deleteVsoftContract(vsoftCustomerId: number, id: number) {
    return this.authHttp.delete(
      this.baseUrl + 'vsoftcustomers/' + vsoftCustomerId + '/vsoftcontracts/' + id
    );
  } */
}
