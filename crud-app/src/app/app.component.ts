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
  constructor(private fb:FormBuilder, private ds:DatasendService){
    this.dataForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required,Validators.email])
    })

  }
  save(){
    this.ds.dataSave(this.dataForm.getRawValue());
  }
}
