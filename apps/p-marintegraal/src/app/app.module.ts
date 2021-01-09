import { PdfTesterComponent } from './_startup/pdf-tester/pdf-tester.component';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';

import { DialogService } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { JwtModule } from '@auth0/angular-jwt';
export function tokenGetter(): string {
  return localStorage.getItem('vsoftToken');
}

export const jwtConfig = {
  tokenGetter,
  whitelistedDomains: environment.apiWhiteListDomain,
  blacklistedRoutes: environment.apiBlackListDomain
};

// import { ErrorInterceptorProvider } from './_services/error.interceptor';
// import { ListsResolver } from './_resolvers/lists.resolver';
// import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

import { AuthGuard } from './_guards/auth.guard';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { LanguageService } from './_services/language.service';
import { AlertifyService } from './_services/alertify.service';

import { MenuBarComponent } from './_startup/menubar/menubar.component';
import { WelcomeComponent } from './_startup/welcome/welcome.component';
import { ExitComponent } from './_startup/exit/exit.component';
import { LoginComponent } from './_startup/login/login.component';
import { ModalLanguageComponent } from './_startup/menubar/modallanguage/modallanguage.component';

import { ModalPrimeComponent } from './_shared/modalprime/modalprime.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    ModalLanguageComponent,
    MenuBarComponent,
    WelcomeComponent,
    ExitComponent,
    LoginComponent,
    ModalPrimeComponent,
    PdfTesterComponent,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    PanelModule,
    ListboxModule,
    DynamicDialogModule,
    MenubarModule,
    InputTextModule,
    CardModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: jwtConfig
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxQRCodeModule
  ],
  providers: [
    // ListsResolver,
    // ErrorInterceptorProvider,
    AlertifyService,
    DialogService,
    LanguageService,
    AuthService,
    AuthGuard,
    UserService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [ModalLanguageComponent, ModalPrimeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }




/* import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {} */
