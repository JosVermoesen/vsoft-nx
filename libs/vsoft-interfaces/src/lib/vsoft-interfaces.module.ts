import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    SliderComponent,
    TextInputComponent,
    DateInputComponent
  ],
  exports: [
    SliderComponent,
    TextInputComponent,
    DateInputComponent
  ],
})
export class VsoftInterfacesModule { }
