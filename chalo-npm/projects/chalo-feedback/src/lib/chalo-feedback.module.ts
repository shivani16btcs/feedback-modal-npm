import { NgModule } from '@angular/core';
import { ChaloFeedbackComponent } from './chalo-feedback.component';
import { CommonModule } from '@angular/common';  


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChaloFeedbackComponent],
  exports: [ChaloFeedbackComponent]
})
export class ChaloFeedbackModule { }
