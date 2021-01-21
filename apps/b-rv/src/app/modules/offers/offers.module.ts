import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

import { AlertModule } from 'ngx-bootstrap/alert';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { VsoftInterfacesModule } from '@vsoft-nx/vsoft-interfaces';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [OffersComponent],
  imports: [
    CommonModule,
    OffersRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    NgxQRCodeModule,
    ReactiveFormsModule,
    VsoftInterfacesModule
  ],
})
export class OffersModule { }
