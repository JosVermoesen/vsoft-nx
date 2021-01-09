import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vsoft-nx-ledgeraccount-detail',
  templateUrl: './ledgeracount-detail.component.html'
})
export class LedgerAccountDetailComponent {
  constructor(private router: Router) {}

  handleChange(e) {
    if (e.index === 0) {
      this.router.navigate(['/ledgeraccounts/list']);
    }
  }
}
