import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasendService {
  url = "http://localhost:3000/api"
  constructor(private http:HttpClient) { }
  // Saving data
  dataSave(data: any){
    return this.http.post(this.url+"/indata", data)
    .subscribe(
      (res)=>{
        console.log(res);
      }
    )
  }
  // Fetching data
  getData(){
    return this.http.get(this.url+"/getData");
  }
  // Deleting data
  delItem(id:any){
    // console.log(id)  Checking for id
    return this.http.get(this.url+"/delData/"+id);
  }
  updItem(id: any, data:any){
    // console.log(data) CHecked
    return this.http.put(this.url+"/updData/"+id, data);
  }
}
