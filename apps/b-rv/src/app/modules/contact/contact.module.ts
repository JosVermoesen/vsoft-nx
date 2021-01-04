import { ModalMeetupComponent } from './modal-meetup/modal-meetup.component';
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
import { ModalOfficeInfoComponent } from './modal-officeinfo/modal-office-info.component';

import { SharedModule } from '../../shared/shared.module';
// import { CountdownModule, CountdownGlobalConfig } from 'ngx-countdown';

import { SharedUiModule } from '@vsoft-nx/shared-ui';

@NgModule({
  declarations: [
    ContactComponent,
    ModalOfficeInfoComponent,
    ModalMeetupComponent
  ],
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
    SharedModule,
    SharedUiModule
    // CountdownModule
  ],
  providers: []
})
export class ContactModule { }
