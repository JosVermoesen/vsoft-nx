import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'vsoft-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accordeonUpdateOpen = true;
  accordeonOneAtATime = true;

  taxOnWebHtml: string = null;
  // livingFlandersHtml: string = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const tow = 'html/taxOnWeb.html';
    this.http
      .get('assets/templates/' + tow, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.taxOnWebHtml = data;
      });

    /* const livingFlanders = 'html/livingFlanders.html';
    this.http
      .get('assets/templates/' + livingFlanders, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.livingFlandersHtml = data;
      }); */
  }
}
