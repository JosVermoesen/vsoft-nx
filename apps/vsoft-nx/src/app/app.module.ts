import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SharedUiModule } from '@vsoft-nx/shared-ui';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [AppComponent, PrivacyComponent],
  imports: [BrowserModule, SharedUiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
