import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { appDirective } from './{your-path}';
// import { appService } from './{your-path}';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

import { MdToHtmlPipe } from './helpers/md-to-html.pipe';

@NgModule({
  declarations: [
    MdToHtmlPipe, // so we use already for a pipe
    // appDirective
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    })],
  exports: [
    MdToHtmlPipe, // so we use already for a pipe
    // appDirective
  ],
})
export class SharedModule {
  /* static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      // providers: [ appService ]
    };
  } */
}
