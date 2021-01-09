import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from "primeng/tabview";
import { PanelModule } from "primeng/panel";
import { ListboxModule } from "primeng/listbox";
import { InputTextModule } from "primeng/inputtext";
import { CardModule } from "primeng/card";

import { routes } from "./ledgeraccounts-routing.module";
import { LedgerAccountService } from "./services/ledgeraccount.service";
import { LedgerAccountSetupComponent } from "./ledgeraccount-setup/ledgeraccount-setup.component";
import { LedgerAccountsListComponent } from "./ledgeraccounts-list/ledgeraccounts-list.component";
import { LedgerAccountListResolver } from "./resolvers/ledgeraccount-list.resolver";
import { LedgerAccountDetailComponent } from "./ledgeraccount-detail/ledgeraccount-detail.component";
import { LedgerAccountDetailResolver } from "./resolvers/ledgeraccount-detail.resolver";
import { LedgerAccountNewComponent } from "./ledgeraccount-new/ledgeraccount-new.component";
import { LedgerAccountEditComponent } from "./ledgeraccount-edit/ledgeraccount-edit.component";
import { LedgerAccountEditResolver } from "./resolvers/ledgeraccount-edit.resolver";
import { LedgerAccountLedgersComponent } from "./ledgeraccount-ledgers/ledgeraccount-ledgers.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    ListboxModule,
    TableModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LedgerAccountSetupComponent,
    LedgerAccountsListComponent,
    LedgerAccountDetailComponent,
    LedgerAccountNewComponent,
    LedgerAccountEditComponent,
    LedgerAccountLedgersComponent,
  ],
  providers: [
    LedgerAccountService,
    LedgerAccountListResolver,
    LedgerAccountDetailResolver,
    LedgerAccountEditResolver,
  ],
})
export class LedgerAccountsModule {}
