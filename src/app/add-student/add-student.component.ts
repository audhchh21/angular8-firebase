import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {

  public studentForm: FormGroup;

  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) { }


  ngOnInit() {
    this.crudApi.GetStudentsList();
    this.studenForm();
  }

  studenForm() {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      faculty: ['', [Validators.required]],
      major: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{1}')]],
      address: ['']
    })
  }

  get firstName() {
    return this.studentForm.get('firstName');
  }

  get lastName() {
    return this.studentForm.get('lastName');
  }

  get email() {
    return this.studentForm.get('email');
  }

  get mobileNumber() {
    return this.studentForm.get('mobileNumber');
  }

  get faculty() {
    return this.studentForm.get('faculty');
  }

  get major() {
    return this.studentForm.get('major');
  }

  get year() {
    return this.studentForm.get('year');
  }

  get address() {
    return this.studentForm.get('address');
  }

  ResetForm() {
    this.studentForm.reset();
  }

  submitStudentData() {
    this.crudApi.AddStudent(this.studentForm.value);
    this.toastr.success('เพิ่มนักเรียน "' + this.studentForm.controls['firstName'].value + '" ใหม่สำเสร็จ!');
    this.ResetForm();
   };

}
