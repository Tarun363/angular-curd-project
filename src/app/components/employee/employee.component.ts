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

  hadServices = false;
  employee: Employee;
  employeeList: Employee[] = [];
  phoneNumberPrefixList = [
    { id: 1, value: "+91" },
    { id: 2, value: "+1" },
    { id: 3, value: "+93" },
    { id: 4, value: "+340" },
    { id: 5, value: "+670" },
    { id: 6, value: "+684" },
    { id: 7, value: "+242" }
  ]

  ngOnInit(): void {
    // if (this.hadServices) {
    this.getAllEmployees();
    // }
    $(() => {
      $('#phoneNumberPrefix').select2({
        placeholder: 'Select an option'
      });
    });
  }

  public saveEmployee() {
    this.validateEmployee();
    if (!$('form[name="employeeForm"]').valid()) { return; }
    if (this.hadServices) {
      this.employeeService.saveEmployee(this.employee).subscribe(() => {
        $('.modal').modal('hide');
        this.getAllEmployees();
      });
    } else {
      this.employee.id = this.employeeList.length + 1;
      this.employeeList.push(this.employee);
      $('.modal').modal('hide');
    }
  }

  public getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      this.employeeList = res;
    }, err => {
      if (err.status === 504) {
        this.hadServices = false;
      }
    });
  }

  public getEmployee() {
    if (this.hadServices) {
      this.employeeService.getEmployee(this.employee.id).subscribe((res: any) => {
        this.employee = res;
      });
    } else {

    }
  }

  public updateEmployee() {
    this.validateEmployee();
    if (!$('form[name="employeeForm"]').valid()) { return; }
    if (this.hadServices) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        this.getAllEmployees();
      });
    } else {
      const idx = this.employeeList.findIndex(e => e.id === this.employee.id);
      if (idx !== -1) {
        this.employeeList[idx] = this.employee;
        $('.modal').modal('hide');
      }
    }
  }

  public deleteEmployee() {
    if (this.hadServices) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe(() => {
        this.getAllEmployees();
      });
    } else {
      const idx = this.employeeList.findIndex(e => e.id === this.employee.id);
      if (idx !== -1) {
        this.employeeList.splice(idx, 1);
      }
    }
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

    const namePattern = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
    const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    // $.validator.addMethod('name', (value: string, element: any, arg: any) => {
    //   const str = value.trim();
    //   const regex = new RegExp(namePattern);

    //   if (regex.test(str)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }, 'Enter a valid name');


    /** email id validator **/
    $.validator.addMethod('emailId', (value: string, element: any, arg: any) => {
      const str = value.trim();
      const regex = new RegExp(emailPattern);

      if (regex.test(str)) {
        return true;
      } else {
        return false;
      }
    }, 'Enter a valid email id')

    $('form[name="employeeForm"]').validate({
      focusInvalid: false,
      rules: {
        firstName: {
          required: true,
          // name: true,
        },
        // lastName: {
        //   required: false,
        //   name: true,
        // },
        emailId: {
          required: true,
          emailId: true
        },
        gender: {
          required: true,
        },
        phoneNumberPrefix: {
          required: true,
        },
        phoneNumber: {
          required: true,
        },
        department: {
          required: true,
        },
        about: {
          required: true,
          minlength: 10,
          maxlength: 1000,
        }
      },
      messages: {
        firstName: {
          required: "First name is required!"
        },
        emailId: {
          required: "Email id is required!",
        },
        gender: {
          required: "Gender is required!",
        },
        phoneNumberPrefix: {
          required: "Phone number prefix is required!"
        },
        phoneNumber: {
          required: "Phone number is required!"
        },
        department: {
          required: "Department is required!"
        },
        about: {
          required: "About is required!",
          minlength: "Minimum of 10 characters",
          maxlength: "Maximum of 1000 characters",
        }
      },
      errorPlacement: (error: any, element: any) => {
        if (element.attr('name') === 'gender') {
          error.insertAfter('.genderDiv');
        } else if (element.attr('name') === 'phoneNumberPrefix' || element.attr('name') === 'phoneNumber') {
          error.insertAfter('.phoneNumberDiv');
        } else {
          error.insertAfter(element);
        }
      },
    });
  }

  public resetForm() {
    $('form[name="employeeForm"]').validate().resetForm();
  }

}
