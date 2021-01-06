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

import { GadgetsRoutingModule } from './gadgets-routing.module';
import { GadgetsComponent } from './gadgets.component';
import { VsoftInterfacesModule } from '@vsoft-nx/vsoft-interfaces';

@NgModule({
  declarations: [GadgetsComponent],
  imports: [
    CommonModule,
    GadgetsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AlertModule.forRoot(),
    ReactiveFormsModule,
    VsoftInterfacesModule
  ],
})
export class GadgetsModule {}
