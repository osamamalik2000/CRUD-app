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
  rawData: any;
  insData: any;
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
  // Updating data with the help of window.prompt function
  update(id: any){
    let uData:any;
    uData = this.fb.group({
      'product': window.prompt("Product:"),
      'quantity': window.prompt("Quantity:")
    });
    this.ds.updItem(id, uData.getRawValue())
    .subscribe(res=>{
      console.log(res);
    })
    this.ngOnInit();
  }
}
