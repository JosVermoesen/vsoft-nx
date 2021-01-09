import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vsoft-nxexit',
  templateUrl: './exit.component.html'
})
export class ExitComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {


      this.authService.currentUser = null;
      localStorage.removeItem('vsoftToken');
      localStorage.removeItem('vsoftUser');
      // this.router.navigate(['/home']);


  }

}
