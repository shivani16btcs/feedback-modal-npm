import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'lib-chalo-feedback',
  template: `
  <div  id="myDIV" >
  <div class="feedback-modal"> 
      <div class="feedback-modal-content">
         
        <div class="feedback-modal-header">
          <div class="feedback-logo1">
              <img src="https://www.waterbridge.vc/wp-content/uploads/2018/08/Profile_Chalo.jpg" height="45px"  width="180px" alt="" />
          </div>
              <button 
              class="feedback-close_bar"
              data-dismiss="modal"
              aria-label="Close">
              ×
              </button>
        </div>
      
          <div class="modal-body">
              <p class="feedback-content">We love to hear what you thought about Chalo</p>
              <input type="button" class="feedback-button" value="Give Feedback">

          </div>

      </div>
  </div>
</div>
  `,
  styles: []
})
export class ChaloFeedbackComponent implements OnInit {
//   @Input('email') email=''
//   @Input('app') app='Dispatch'
  constructor() { }

//   public feedbackPopUp:Boolean=true;


  ngOnInit(): void {
  }


//  modalClose(){
//     this.feedbackPopUp=false;
// }

//  giveFeedback(){
//     let url='http://127.0.0.1:5500/feedback.html'
//     let Url=url+'?email='+this.email+'&app='+this.app;
//     window.open(Url, "_blank");
// }

}
