import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

import { AlertModule } from 'ngx-bootstrap/alert';

import { SteppertestRoutingModule } from './steppertest-routing.module';
import { SteppertestComponent } from './steppertest.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [SteppertestComponent],
  imports: [
    CommonModule,
    SteppertestRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AlertModule.forRoot(),
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SteppertestModule { }
