import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SliderComponent, TextInputComponent],
  exports: [SliderComponent, TextInputComponent],
})
export class SharedUiModule {}
