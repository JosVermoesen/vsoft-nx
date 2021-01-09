/* eslint-disable @typescript-eslint/no-explicit-any */
import { LanguageService } from './../../_services/language.service';
import { Component, OnInit, Output } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';

import { ModalLanguageComponent } from './modallanguage/modallanguage.component';
import { LoginComponent } from './../login/login.component';
import { AuthService } from './../../_services/auth.service';

@Component({
  selector: 'vsoft-nx-menubar',
  templateUrl: './menubar.component.html'
})
export class MenuBarComponent implements OnInit {
  @Output()
  itemsLoggedOut: MenuItem[];
  itemsLoggedIn: MenuItem[];

  model: any = {};

  constructor(
    public authService: AuthService,
    private ts: TranslateService,
    private ls: LanguageService,
    public ds: DialogService
  ) {}

  ngOnInit() {
    this.setMenuItems();
  }

  setMenuItems() {
    this.ts.get('MENUS.MAINLOGGEDIN').subscribe((res: MenuItem[]) => {
      this.itemsLoggedIn = res;
    });
    // const programLabel = this.ts.instant('NAVBAR.programTitle');
    // const loginLabel = this.ts.instant('NAVBAR.loginLabel');
    this.itemsLoggedOut = this.itemsLoggedOut = [
      {
        label: 'Start', // todo: fix with programLabel
        items: [
          {
            label: 'Log In', // todo: fix with loginLabel
            icon: 'pi pi-plus',
            command: () => {
              this.onLoginModal();
            }
          }
        ]
      }
    ];
  }

  loggedIn() {
    const token = localStorage.getItem('vsoftToken');
    return !!token;
  }

  onLoginModal() {
    const loginLabel = this.ts.instant('NAVBAR.loginLabel');
    const initialState = {
      header: loginLabel,
      width: '50',
      data: {}
    };
    const ref = this.ds.open(LoginComponent, initialState);

    ref.onClose.subscribe((res: string) => {
      if (res) {
        this.setMenuItems();
      }
    });
  }

  onLanguageModal() {
    const initialState = {
      header: this.ts.instant('NAVBAR.languageModalTitle'),
      width: '40',
      data: {}
    };
    const ref = this.ds.open(ModalLanguageComponent, initialState);

    ref.onClose.subscribe((res: string) => {
      if (res) {
        // console.log('content of res: ' + res);
        this.setMenuItems();
      }
    });
  }
}
