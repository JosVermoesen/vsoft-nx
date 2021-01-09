import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from './_services/language.service';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'vsoft-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private ls: LanguageService,
    private router: Router,
    private authService: AuthService,
    private jwtHelperService: JwtHelperService
  ) { }

  ngOnInit() {
    // document.documentElement.style.fontSize = '14px';
    const token = localStorage.getItem('vsoftToken');
    const user: User = JSON.parse(localStorage.getItem('vsoftUser'));
    if (token) {
      this.authService.decodedToken = this.jwtHelperService.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      // this.router.navigate(['/z/menu']);
    } else {
      this.router.navigate(['/welcome']);
    }
    this.ls.setInitialAppLanguage();
  }
}
