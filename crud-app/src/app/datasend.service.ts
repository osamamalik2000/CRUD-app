import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasendService {
  url = "http://localhost:3000/api"
  constructor(private http:HttpClient) { }
  dataSave(data: any){
    return this.http.post(this.url+"/indata", data)
    .subscribe(
      (res)=>{
        console.log(res);
      }
    )
  }
  getData(){
      return this.http.get(this.url+"/getData");
  }
}
