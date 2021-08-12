import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasendService {
  url = "http://localhost:3000"
  constructor(private http:HttpClient) { }
  dataSave(data: any){
    return this.http.post(this.url+"/data", data)
    .subscribe(
      (res)=>{
        console.log(res);
      }
    )
  }
}
