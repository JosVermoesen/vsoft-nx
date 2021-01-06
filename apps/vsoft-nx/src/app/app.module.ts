import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { PrivacyComponent } from './privacy/privacy.component';
import { VsoftInterfacesModule } from '@vsoft-nx/vsoft-interfaces';

@NgModule({
  declarations: [AppComponent, PrivacyComponent],
  imports: [BrowserModule, VsoftInterfacesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
