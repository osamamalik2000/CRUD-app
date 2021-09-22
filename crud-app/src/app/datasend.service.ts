import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DatasendService {
  url = "http://localhost:3000/api"
  constructor(private http:HttpClient, private firebase: AngularFireDatabase) { }
  shoppingList!: AngularFireList<any>;
  
  // Fetching data
  getData(){
    this.shoppingList = this.firebase.list('List');
    return this.shoppingList.snapshotChanges();
  }
  // Saving data
  dataSave(data: any){
    this.shoppingList.push(data);
    // console.log(data);
  }
  // Deleting data
  delItem($key:any){
    // console.log(id)  Checking for id
    return this.shoppingList.remove($key);
  }
  updItem(id: any, data:any){
    // console.log(data) CHecked
    // return this.http.put(this.url+"/updData/"+id, data);
    return this.shoppingList.update(id, data);
  }
}
