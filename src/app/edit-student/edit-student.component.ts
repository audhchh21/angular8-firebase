import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})

export class EditStudentComponent implements OnInit {

  editForm: FormGroup;  // Define FormGroup to student's edit form

  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ){ }

  ngOnInit() {
    this.updateStudentData();   // Call updateStudentData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetStudent(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
    })
  }

  // Accessing form control using getters
  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get email() {
    return this.editForm.get('email');
  }

  get mobileNumber() {
    return this.editForm.get('mobileNumber');
  }

  get faculty() {
    return this.editForm.get('faculty');
  }

  get major() {
    return this.editForm.get('major');
  }

  get year() {
    return this.editForm.get('year');
  }

  get status() {
    return this.editForm.get('status');
  }

  updateStudentData() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      faculty: ['', [Validators.required]],
      major: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{1}')]],
      address: ['']
    })
  }

  goBack() {
    this.location.back();
  }

  updateForm(){
    this.crudApi.UpdateStudent(this.editForm.value);
    this.toastr.success('แก้ไขข้อมูล "' + this.editForm.controls['firstName'].value + '" สำเสร็จ!');
    this.router.navigate(['students']);
  }

}
