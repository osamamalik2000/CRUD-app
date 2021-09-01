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
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email])
    })
  }
  ngOnInit(){
    this.getD();
  }
  save(){
    this.ds.dataSave(this.dataForm.getRawValue());
    this.dataForm.reset();
    this.ngOnInit();
  }
  getD(){
    this.ds.getData()
    .subscribe(res=>{
      this.rawData = res;
      this.insData = this.rawData.data;
    }
    )
  }
  delete(id: any){
    this.ds.delItem(id)
    .subscribe(res=>{
      console.log(res);
    })
    this.ngOnInit();
  }
}
