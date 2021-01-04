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

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { OfficeInfoModalComponent } from './officeinfo-modal/office-info-modal.component';

@NgModule({
  declarations: [ContactComponent, OfficeInfoModalComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AlertModule.forRoot(),
    ReactiveFormsModule,
  ],
})
export class ContactModule {}
