import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ILedgerAccount } from "../models/ledgerAccount";
import { PaginatedResult } from "../../../_models/pagination";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
// import { UIService } from '../_shared/ui.service';

@Injectable()
export class LedgerAccountService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: HttpClient) {}

  getLedgerAccounts(page?, itemsPerPage?, accountParams?) {
    const paginatedResult: PaginatedResult<
      ILedgerAccount[]
    > = new PaginatedResult<ILedgerAccount[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    if (accountParams != null) {
      params = params.append("minA107", accountParams.minA107);
      params = params.append("maxA107", accountParams.maxA107);
    }

    return this.authHttp
      .get<ILedgerAccount[]>(this.baseUrl + "vsoftledgeraccounts", {
        observe: "response",
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      );
  }

  getLedgerAccount(id): Observable<ILedgerAccount> {
    return this.authHttp.get<ILedgerAccount>(
      this.baseUrl + "vsoftledgeraccounts/" + id
    );
  }

  newLedgerAccount(account: ILedgerAccount) {
    // this.uiService.loadingStateChanged.next(true);
    return this.authHttp.post(
      this.baseUrl + "vsoftledgeraccounts/accountcreate",
      account,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      }
    );
  }

  updateLedgerAccount(account: ILedgerAccount) {
    return this.authHttp.put(
      this.baseUrl + "vsoftledgeraccounts/updateaccount",
      account
    );
  }

  // TODO IF NEEDED:
  /* deleteVsoftContract(vsoftCustomerId: number, id: number) {
    return this.authHttp.delete(
      this.baseUrl + 'vsoftcustomers/' + vsoftCustomerId + '/vsoftcontracts/' + id
    );
  } */
}
