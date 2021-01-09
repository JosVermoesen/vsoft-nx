import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'vsoft-nxlogin',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  model: any = {};
  primeSpinner = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private ts: TranslateService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  login() {
    this.primeSpinner = true;
    this.authService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      })
      .subscribe(
        data => {
          this.ts.get('LOGIN.success').subscribe((res: string) => {
            this.alertify.success(res);
          });
        },
        error => {
          this.ts.get('LOGIN.failed').subscribe((res: string) => {
            this.alertify.error(res);
          });
          this.primeSpinner = false;
        },
        () => {
          this.primeSpinner = false;
          this.router.navigate(['/z/menu']);
          this.onCanceled();
        }
      );
  }

  onCanceled() {
    this.ref.close('cancel');
  }
}
