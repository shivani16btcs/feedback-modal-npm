import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'lib-chalo-feedback',
  template: `
<style>

.feedback-modal{
    position: absolute;
    z-index: 9;
    bottom: 23px;
    right: 28px;
    width: 280px;
    font-family: arial;
}


.feedback-modal-content {
    background-color: #fff;
    padding: 1rem 1rem;
    box-shadow: 0 8px 20px 6px rgba(0, 116, 163, 0.16);
    border-radius: 0.3rem;
    outline: 0;
    overflow: hidden;
  }
.feedback-logo1{
    display: flex;
    justify-content: center;
}

.feedback-modal-header{
    font-size:18px;
   display: flex;
   justify-content: space-between;
   color:#fe7c00;
   font-weight: 600;
    font-size:20px;
    font-style: arial;
}

.feedback-content{
    font-weight: 600;
}

 .feedback-close_bar{
    background-color:transparent;
    border:none;
    color:#fe7c00;
    font-weight: 600;
    font-size:20px;
    cursor: pointer;
}
.feedback-close_bar:hover{
   font-size: 25px;
}
.feedback-button{
    border: 1;
    padding:1px;
    outline: none;
    cursor: pointer;
    border-radius:5px;
    background-color:#fe7c00;
    color:#fff;
}

.feedback-button:hover {
    padding:2px;
    border: 1;
    border-color:#fe7c00;;
}
</style>

  <div  id="myDIV" >
  <div class="feedback-modal" *ngIf="feedbackPopUp"> 
      <div class="feedback-modal-content">
         
        <div class="feedback-modal-header">
          <div class="feedback-logo1">
              <img src="https://www.waterbridge.vc/wp-content/uploads/2018/08/Profile_Chalo.jpg" height="45px"  width="180px" alt="" />
          </div>
              <button 
              (click)="modalClose()"
              class="feedback-close_bar"
              data-dismiss="modal"
              aria-label="Close">
              ×
              </button>
        </div>
      
          <div class="modal-body">
              <p class="feedback-content">We love to hear what you thought about Chalo</p>
              <input type="button" (click)="giveFeedback()" class="feedback-button" value="Give Feedback">

          </div>

      </div>
  </div>
</div>
  `,
  styles: []
})
export class ChaloFeedbackComponent implements OnInit {
  @Input('email') email=''
  @Input('app') app='Dispatch'
  constructor() { }

  public feedbackPopUp:Boolean=true;


  ngOnInit(): void {
  }


 modalClose(){
    this.feedbackPopUp=false;
}

 giveFeedback(){
    let url='http://127.0.0.1:5500/feedback.html'
    let Url=url+'?email='+this.email+'&app='+this.app;
    window.open(Url, "_blank");
    this.modalClose();
}

}
