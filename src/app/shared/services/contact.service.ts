import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


getAllContacts(){
  return this.http.get<any>("http://localhost:3000/contacts")
  .pipe(
    map((res: any) =>{
  return res;
  }))
}

getContactById(id: number){
  return this.http.get<any>("http://localhost:3000/contacts/"+id)
  .pipe(
    map((res: any) =>{
  return res;
  }))
}

postContact(data: any){
  return this.http.post<any>("http://localhost:3000/contacts", data)
  .pipe(
    map((res: any) =>{
  return res;
  }))
}
editContact(data: any, id:number){
  return this.http.put<any>("http://localhost:3000/contacts/"+id, data)
  .pipe(
    map((res: any) =>{
  return res;
  }))
}
deleteContact(id:number){
  return this.http.delete<any>("http://localhost:3000/contacts/"+id)
  .pipe(
    map((res: any) =>{
  return res;
  }))
}

deleteSeveralContacts(ids: any ){
  fetch('http://localhost:3000/contacts?id=' + ids.join(','), {
    method: 'DELETE'
  })
  
  .then(res =>{
    alert('Contact deleted Successfully')
  })
  .catch(error => {
    alert('Something went wrong')
  })
 }
}
