import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})

export class ListStudentComponent implements OnInit {

  constructor(private student: StudentsService) { }

  studentData:any=[];

  dtOptions:DataTables.Settings = {}

  ngOnInit(): void {
    this.datatableSetting();
    this.load();    
  }

  load(){
    this.student.serviceGetAllStudent().subscribe((allData)=>{
      console.log(allData);
      this.studentData=allData;
    });
  }

  datatableSetting(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5,10,15,50],
      processing: true
    }    
  }

  deleteStudent(student_id:any){
    console.log(student_id);
    this.student.deleteStudent(student_id).subscribe((result) => {
      console.log(result)
      this.load();      
    });
  }

}
