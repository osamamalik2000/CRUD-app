import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatasendService } from './datasend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-app';
  dataForm : FormGroup;
  modal = false //For showing and hiding model
  idUpd:any; //Used in update to pass the item id
  rawData: any; //Response in JSON format
  insData: any;  //Taking only data from json format
  constructor(private fb:FormBuilder, private ds:DatasendService){
    this.dataForm = this.fb.group({
      'product': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required)
    })
  }
  ngOnInit(){
    this.getD();
  }
  // Saving data in db
  save(){
    this.ds.dataSave(this.dataForm.getRawValue());
    this.dataForm.reset();
    this.ngOnInit();
  }
  // Fetching data
  getD(){
    this.ds.getData()
    .subscribe(res=>{
      this.rawData = res;
      this.insData = this.rawData.data;
    }
    )
  }
  // Deleting data
  delete(id: any){
    this.ds.delItem(id)
    .subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    })
  }
  // Modal show 
  modalShow(id:any){
    this.modal = true;
    this.idUpd = id; // Storing id for use in getting the elemnt to be updated in update() function
  }
  // Modal Hide
  modalHide(){
    this.modal = false;
  }
  // Updating data with the help of window.prompt function
  update(){
    this.ds.updItem(this.idUpd, this.dataForm.getRawValue())
    .subscribe(res=>{
      console.log(res);
    });
    this.modalHide(); //For hiding the modal after form submission
    this.ngOnInit();
  }
}
