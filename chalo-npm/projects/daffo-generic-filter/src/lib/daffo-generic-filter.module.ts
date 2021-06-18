import { NgModule } from '@angular/core';
import { DaffoGenericFilterComponent } from './daffo-generic-filter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // NgxMaterialTimepickerModule
  ],
  declarations: [DaffoGenericFilterComponent],
  exports: [DaffoGenericFilterComponent]
})
export class DaffoGenericFilterModule { }
