import { NgModule } from '@angular/core';
import { ChaloGenericFilterComponent } from './chalo-generic-filter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ChaloGenericFilterComponent],
  exports: [ChaloGenericFilterComponent]
})
export class ChaloGenericFilterModule { }
