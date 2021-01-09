import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vsoft-nx-supplier-detail',
  templateUrl: './supplier-detail.component.html'
})
export class SupplierDetailComponent {
  constructor(private router: Router) {}

  handleChange(e) {
    if (e.index === 0) {
      this.router.navigate(['/suppliers/list']);
    }
  }
}
