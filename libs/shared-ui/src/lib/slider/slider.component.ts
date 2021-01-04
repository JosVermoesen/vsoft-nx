import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vsoft-nx-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() nxAmount = 49;

  // constructor() { }

  ngOnInit(): void {
    console.log('whatever');
  }
}
