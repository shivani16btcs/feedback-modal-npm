import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'lib-daffo-generic-filter',
  template: `
  <style>
  .modal-outside{
    width: 1rem;
    background-color: transparent;
    border-color: transparent;
    border: none;
}

.filter-icon{
    font-size: 29px;
    z-index:-100;
    cursor: pointer;
}
.filter-modal{
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:10px;
}

.modal-content{
    background-color: #fff;
    /* padding: 1rem 1rem; */
    /* border: 1px solid rgba(0, 0, 0, 0.2); */
    border-radius: 0.3rem;
    outline: 0;
    overflow: hidden;
    z-index: 100;
    min-width: 400px;
    margin-right: 310px;
    box-shadow: 0 8px 20px 6px rgba(0, 116, 163, 0.16);
}

.filter-head{
    display: flex;
    padding: 1rem 1rem;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: 0.3rem;
}

.shift-right{
    float:right;
    right:0px;
    margin-left:250px;
    display: flex;
}
.reset{
    color:#fe7c00;
    font-size:14px;
    cursor: pointer;
}
.close_bar{
    margin-left:15px;
    cursor: pointer;
}
.modal-title{
    font-size:18px;
    float: left;
    margin-top: -8px;
    line-height: 1.5;
}
.filter-foot{
    text-align: center;
    width: 100%;
    background: #fe7c00;
    border: none;
    color: #fff;
    outline: none;
    cursor: pointer;
    margin: auto;
    padding-top: 11px;
    padding-bottom: 11px;
}

.filter-sidebar{
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    height: 350px;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: auto;
    min-width: 101px;
}


.show-items{
    padding:10px;
    padding-top: 20px;
    padding-bottom:0px;
    cursor: pointer;
}

.show-items :hover {
    color: #fe7c00;
  }

.active{
padding:0 !important;
color:#fe7c00;
padding:10px;
padding-top: 0px !important;
margin:0 !important;
cursor: pointer;
background-color: rgb(251, 251, 251);
padding-top: 15px;
padding-bottom: 15px;
text-decoration: underline;
}  

.item-active{
    color:#fe7c00;
    font-style: bold;  
}
 

.scroll{
    height:350px;
    width: 100%;
    overflow-y: auto;
}

.show-time{
    padding:10px;
    padding-top: 20px;
    cursor: pointer;
}

.filter-item{
    padding:10px;
    border:1px;
    color:#fe7c00;
    background-color: #fff;
    border-radius: 20px;
    margin-right:10px;
    height: 100%;
  }


.content{
    display:flex;
  }
  
.cross{
    color:#0e0c0c;
    cursor: pointer;
  }

.filtered-value{
    color:#fe7c00 !important; 
}

.items{
    min-height:20px !important;
}

input{
    /* margin: 5px; */
    width: 250px;
    border: none;
    padding-top: 10px;
    border-bottom: 2px solid #000;  
}

input:focus-within {
    outline: none ! important;
    border-color:#fe7c00 !important; 
}  

.time-active{
    border-color:#fe7c00 !important; 
}

.filter-search-bar{
    position:fixed;
    margin-left:10px;
}

.list-item{
    display:flex; 
    flex-direction:column;
}
  </style> 
  <div class="content">
  <div  *ngFor="let item of appliedFilter; let i = index">
   <div *ngIf="i < showLimit" class=" filter-item items">
       <span  class="cross">{{item.label}}&nbsp;:&nbsp;<strong class="filtered-value ">{{item.value}} </strong></span> 
       <span  class="cross" (click)="removeFilter(item)">&nbsp;&nbsp;<strong>X</strong></span>
   </div>
  </div>
  <div *ngIf="showLimit < appliedFilter?.length "  (click)="expand()" class="content filter-item items">
       <span> + {{appliedFilter.length - showLimit}} </span> 
  </div>
  
  <div class="modal-outside">
  <div class="filter-icon" (click)="openFilter()" [ngClass]="isFilterApplied ? 'item-active':''" ><i class="fa fa-filter"></i></div>
  <div class="filter-modal" *ngIf="dropDownOpen"> 
   <div class="modal-content">
     <div class="filter-head">
       <div class="modal-title"> Filter </div>
       <div class="shift-right">
         <div class="reset">
           <span aria-hidden="true" (click)="reset()"> Reset</span>
         </div>
         <div
           (click) = "modalClose()"
           class="close_bar">
           <span aria-hidden="true"><strong>X</strong></span>
         </div>
       </div>
     </div>
     <div class="content">
     <div class="filter-sidebar ">
       <div class="show-items"  *ngFor="let item of categories" value="item">
         <a (click)="showItem(item.key)" [ngClass]="checkSelectedCategory(item.key)||selectedKey == item.key  ? 'active':''">{{item.label}}</a>
       </div>
     </div>
     <div class="filter-item-content scroll search-active">
       <div *ngIf="selectedKey != 'time'">
         <div *ngIf="allowSearchFilter" class="filter-search-bar">
           <input  matInput type="text"  placeholder="Search.." [(ngModel)]="searchWord" (input)="searchThis()">
         </div>
         <br>
         <div class="show-items list-item"  *ngFor="let item of searchList" value="item">
           <a (click)="selectItem(item)" [ngClass]="(selectedValue == item) ? 'active':''">{{item}}</a>
        </div>
       </div>
      

     </div>
   </div>

       <div class="filter-foot" (click)="Apply()">
       Apply 
     </div>
   </div>
  
  </div>  
  </div>
  </div> 

  `,
  styles: []
})
export class DaffoGenericFilterComponent implements OnInit {
  @Input("tableData") tableData: any = []; 
  @Input("categories") categories = []; //mandatory: format = [{label:'',key:''}];
  @Input("categoryItems") categoryItems:any; //mandatory: format = [{ name:'',listItem:[]}]
  @Input("preFillFilter") preFillFilter = [];
  @Input("itemsShowLimit") itemsShowLimit = 1;
  @Input ("allowSearchFilter") allowSearchFilter = true;
  @Input ("allowExpandFilter") allowExpandFilter = true;

  @Output() applyFilter = new EventEmitter<any>(); // Output: format = {filter:any,filteredData:any} where filter= [{key:'', value:'', label:''}]

  public SelectedFilterItems = [];
  public selectedKey;
  public item;
  public selectedFinalItem: any = [];
  public dropDownOpen=false;
  public selectedValue;
  public fromTime = '';
  public toTime = '';
  public appliedFilter: any;
  public filteredTableData: any;
  public isFilterApplied: boolean = false;
  public searchWord
  public searchList
  public showLimit;

  constructor() {}

  ngOnInit() {
    if(this.tableData.length){
    this.filteredTableData=JSON.parse(JSON.stringify(this.tableData));
    this.Apply();
    }
  }

//---------------- open filter modal ---------------- 
  openFilter(){
    this.dropDownOpen =! this.dropDownOpen;
    if(this.categoryItems.length>1 && this.categoryItems[0].name == ''){
      this.categoryItems.shift();
    }
    this.preFilledFilter()
    this.selectedKey = this.categoryItems[0].name;
    this.showItem(this.selectedKey);
    this.showLimit = this.itemsShowLimit;

  }

//---------------- pre fill filter ---------------- 
  preFilledFilter(){
    this.selectedFinalItem = (this.preFillFilter.length)?[...this.preFillFilter]:[{ key: "" ,value: "" }];
    this.selectedValue='';
    const sIndex = this.selectedFinalItem.findIndex(categoryItem => categoryItem.key == 'time');
    if(sIndex != -1){
      let split = this.selectedFinalItem[sIndex].value.split("-");
      this.fromTime = split[0]||'';
      this.toTime = split[1]||'';
    }
  }

//---------------- on selecting a sidebar category item ---------------- 
selectItem(selectedItem){
  if(!this.selectedKey || !selectedItem){
    return;
  }
  const labelIndex = this.categories.findIndex(categoryItem => categoryItem.key == this.selectedKey);
  let Value = {key:this.selectedKey, value:selectedItem, label:this.categories[labelIndex].label};
  this.selectedValue = selectedItem;
    const sIndex = this.selectedFinalItem.findIndex(categoryItem => categoryItem.key == this.selectedKey);
  if(sIndex != -1){
    this.selectedFinalItem[sIndex] = Value;
  }else if(this.selectedFinalItem[0].key == '' && this.selectedFinalItem[0].value == ''){
    this.selectedFinalItem[0] = Value;
  }else {
    this.selectedFinalItem[this.selectedFinalItem.length] = Value;
  }
}

//---------------- render selected category item ---------------- 
  showItem(item){
    this.selectedKey = item;
    const sIndex = this.categoryItems.findIndex(categoryItem => categoryItem.name == item);
    if(sIndex != -1){
      this.SelectedFilterItems = this.categoryItems[sIndex].listItem;
      this.searchList = this.SelectedFilterItems;
      this.setSelectedValue()
    }
  }

  setSelectedValue(){
    const Index = this.selectedFinalItem.findIndex(selectedItem => selectedItem.key == this.selectedKey);
    if(Index != -1){
      this.selectedValue = this.selectedFinalItem[Index].value;
    }
  }

//---------------- set Time  ---------------- 
  setTime(type: string, event) {
    if (type == "fromTime") {
        this.fromTime = event;
    }else {
        this.toTime = event;
    };
    let value = this.fromTime+"-"+this.toTime;
    this.selectItem(value)
  }

//---------------- check existing category ---------------- 
  checkSelectedCategory(categoryKey){
    const sIndex = this.selectedFinalItem.findIndex(categoryItem => categoryItem.key == categoryKey);
    if(sIndex != -1){
      return true;
    } else{
      return false;
    }
  }


//---------------- for search ---------------- 
searchThis(){
  console.log(this.SelectedFilterItems);
  this.searchList =this.SelectedFilterItems;
  this.searchList = this.SelectedFilterItems.filter(item => this.findUserInfo(item, this.searchWord ))
}

findUserInfo(userName, searchString){
  return userName.toLowerCase().substr(0,searchString.length).includes(searchString.toLowerCase());
}

//---------------- on apply filter  ---------------- 
  Apply(){
    this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));;
    if(!this.selectedFinalItem.length||this.selectedFinalItem.length == 1 && (!this.selectedFinalItem[0].key ||!this.selectedFinalItem[0].value)){
      this.selectedFinalItem = [];
      this.isFilterApplied = false;
    }
    if(this.selectedFinalItem.length){
      this.isFilterApplied = true;
    }
    this.FilterData();
    this.appliedFilter = this.selectedFinalItem;
    let event: {filter:any,filteredData:any};
    event = {filter:this.selectedFinalItem, filteredData:this.filteredTableData}
    this.applyFilter.emit(event);
    this.modalClose();
  }

//---------------- filter Data ---------------- 
  FilterData(){
    if(!this.filteredTableData.length){
      return;
    }
    this.selectedFinalItem.forEach( (savedFilter) =>{
       this.filterItem(savedFilter);
    })
  }

  filterItem(savedFilter ){
    if(savedFilter.value == 'All'){
     return;
    }else if(savedFilter.key == 'owner'){
      this.filteredTableData = _.filter(this.filteredTableData, (item) => {
        const index = _.findIndex(item.owner, { ownerId: savedFilter.value });
        if (index != -1) {
            return true;
        }
      })
    }else if(savedFilter.key=='livestatus'){
      return;
    }else if(savedFilter.key=='time'){
      return;
    }else{
      this.filteredTableData = this.filteredTableData.filter(item => item[savedFilter.key] == savedFilter.value);
    }
  }


//---------------- reset filter  ---------------- 
reset(){
  this.selectedFinalItem = [];
  this.fromTime = '';
  this.toTime = '';
  this.isFilterApplied = false;
  this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
  this.Apply();
}

//---------------- remove filter ---------------- 
removeFilter(item){
  const Index = this.selectedFinalItem.findIndex(categoryItem => categoryItem.key == item.key);
  if(Index != -1){
    this.selectedFinalItem.splice(Index, 1);
    this.Apply();
  }
}

//---------------- modal close ---------------- 
modalClose(){
  this.dropDownOpen = false;
  this.fromTime = '';
  this.toTime = ''
}

expand(){
  if(!this.allowExpandFilter){
    return;
  } 
  this.showLimit = this.appliedFilter.length;
}

}
