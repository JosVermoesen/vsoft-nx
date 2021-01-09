import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vsoft-nx-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent {
  constructor(private router: Router) {}

  handleChange(e) {
    if (e.index === 0) {
      this.router.navigate(['/customers/list']);
    }
  }
}
