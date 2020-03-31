import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Student } from './../shared/student';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent implements OnInit {
  p: number = 1;
  Student: Student[];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;


  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
    ){ }


  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetStudentsList();
    s.snapshotChanges().subscribe(data => {
      this.Student = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Student.push(a as Student);
      })
    })
  }

  dataState() {
    this.crudApi.GetStudentsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  deleteStudent(student) {
    if (window.confirm('คุณต้องการที่จะลบข้อมูลนักเรียน ใช่ หรือ ไม่ ?')) {
      this.crudApi.DeleteStudent(student.$key)
      this.toastr.success('ลบข้อมูลนักเรียน "' + student.firstName + '" สำเสร็จ!');
    }
  }

}
