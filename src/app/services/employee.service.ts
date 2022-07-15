import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/assets/modals/Employee.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public BASE_URL = environment.API_URL;

  public saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.BASE_URL + 'employee', employee);
  }

  public getAllEmployees(): Observable<any> {
    return this.http.get(this.BASE_URL + 'employees');
  }

  public getEmployee(id: number): Observable<any> {
    return this.http.get(this.BASE_URL + `employee?id=${id}`);
  }

  public updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.BASE_URL + 'employee', employee);
  }

  public deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.BASE_URL + `employee?id=${id}`);
  }

}