import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/assets/modals/Employee.class';

declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private changeDetector: ChangeDetectorRef) {
    this.employee = new Employee();
  }

  employee: Employee;
  employeeList: Employee[] = [];

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public saveEmployee() {
    this.validateEmployee();
    if (!$('form[name="employeeForm"]').valid()) { return; }
    this.employeeService.saveEmployee(this.employee).subscribe(() => {
      $('.modal').modal('hide');
      this.getAllEmployees();
    });
  }

  public getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      this.employeeList = res;
    });
  }

  public getEmployee() {
    this.employeeService.getEmployee(this.employee.id).subscribe((res: any) => {
      this.employee = res;
    });
  }

  public updateEmployee() {
    this.validateEmployee();
    if (!$('form[name="employeeForm"]').valid()) { return; }
    this.employeeService.updateEmployee(this.employee).subscribe(() => {
      this.getAllEmployees();
    });
  }

  public deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(() => {
      this.getAllEmployees();
    });
  }

  public add() {
    this.employee = new Employee();
    $('#addEditEmployee').modal();
  }

  public edit(emp: Employee) {
    this.employee = emp;
    this.changeDetector.detectChanges();
    $('#addEditEmployee').modal();
  }

  public delete(emp: Employee) {
    this.employee = emp;
    const isDelete = confirm('Are you sure you want to delete?')
    if (isDelete) {
      this.deleteEmployee();
    }
  }

  public validateEmployee() {
    $('form[name="employeeForm"]').validate({
      focusInvalid: false,
      rules: {
        firstName: {
          required: true,
          name: true,
        },
        lasrName: {
          required: false,
          name: true,
        },
        emailId: {
          required: true,
          emailId: true
        },
        phoneNumber: {
          required: true,
        },
        department: {
          required: true,
        }
      },
      messages: {
        firstName: {
          required: "Required!"
        },
        emailId: {
          required: "Required!",
          emailId: true
        },
        phoneNumber: {
          required: "Required!"
        },
        department: {
          required: "Required!"
        }
      },
    });
  }

}
