import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData  : Employee;
  list : Employee[];
  readonly rootURL ="http://localhost:8000/api"

  constructor(private http : HttpClient) { }

  postEmployee(formData : Employee){
   return this.http.post(this.rootURL+'/employee',formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/employee')
    .toPromise().then(res => {
      const data = res['data'];
      this.list =  data as Employee[]
    });
  }

  putEmployee(formData : Employee){
    const id = formData.id 
    delete formData.id
    return this.http.put(this.rootURL+'/employee/'+id, formData);
     
  }

  deleteEmployee(id : number){
    return this.http.delete(this.rootURL+'/employee/'+id);
  }
}
