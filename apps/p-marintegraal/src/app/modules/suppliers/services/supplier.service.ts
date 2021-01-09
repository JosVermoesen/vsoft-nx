import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISupplier } from '../models/supplier';
import { PaginatedResult } from '../../../_models/pagination';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SupplierService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: HttpClient) {}

  getSuppliers(page?, itemsPerPage?, supplierParams?) {
    const paginatedResult: PaginatedResult<
      ISupplier[]
    > = new PaginatedResult<ISupplier[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (supplierParams != null) {
      params = params.append('minA107', supplierParams.minA107);
      params = params.append('maxA107', supplierParams.maxA107);
    }

    return this.authHttp
      .get<ISupplier[]>(this.baseUrl + 'vsoftsuppliers', {
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

  getSupplier(id): Observable<ISupplier> {
    return this.authHttp.get<ISupplier>(
      this.baseUrl + 'vsoftsuppliers/' + id
    );
  }

  newSupplier(supplier: ISupplier) {
    // this.uiService.loadingStateChanged.next(true);
    return this.authHttp.post(
      this.baseUrl + 'vsoftsuppliers/suppliercreate',
      supplier,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    );
  }

  updateSupplier(supplier: ISupplier) {
    return this.authHttp.put(
      this.baseUrl + 'vsoftsuppliers/updatesupplier',
      supplier
    );
  }

  // TODO IF NEEDED:
  /* deleteVsoftContract(vsoftCustomerId: number, id: number) {
    return this.authHttp.delete(
      this.baseUrl + 'vsoftcustomers/' + vsoftCustomerId + '/vsoftcontracts/' + id
    );
  } */
}
