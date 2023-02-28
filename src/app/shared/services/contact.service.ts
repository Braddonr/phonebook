import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


getData(){
  return this.http.get<any>("http://localhost:3000/contacts")
  .pipe(
    map((res: any) =>{
  return res;
  }))
}
}
