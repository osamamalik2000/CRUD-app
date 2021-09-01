import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatasendService } from './datasend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-app';
  dataForm : FormGroup;
  rawData: any;
  insData: any;
  constructor(private fb:FormBuilder, private ds:DatasendService){
    this.dataForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required,Validators.email])
    })
    this.getD();
  }
  save(){
    this.ds.dataSave(this.dataForm.getRawValue());
    this.dataForm.reset();
  }
  getD(){
    this.ds.getData()
    .subscribe(res=>{
      this.rawData = res;
      this.insData = this.rawData.data;
    }
    )
  }
}
