import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { CardModule } from 'primeng/card';

import { routes } from './z-routing.module';
import { ZMenuComponent } from './z-menu/z-menu.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CardModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ZMenuComponent],
  providers: []
  /* ,
  entryComponents: [
    CustomerNewComponent,
    CustomerEditComponent
  ] */
})
export class ZModule { }
