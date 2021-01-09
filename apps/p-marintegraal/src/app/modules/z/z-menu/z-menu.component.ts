import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vsoft-nxz-menu',
  templateUrl: './z-menu.component.html'
})
export class ZMenuComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }

  showPdfTester() {
    this.router.navigate(['/pdftest']);
  }
}
