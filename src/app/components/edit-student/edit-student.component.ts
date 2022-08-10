import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentsService } from 'src/app/students.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(private student: StudentsService, private router: ActivatedRoute) { }

  editStudent = new FormGroup({
    name: new FormControl( '' ),
    email: new FormControl( '' )
  });

  message: boolean=false;

  ngOnInit(): void {
    this.initEditStudent();
  }

  UpdateData(){

    this.student.updateStudentData(this.router.snapshot.params['id'] , this.editStudent.value).
    subscribe((result) => {
      // console.log(result);  
      this.message = true;    
      this.editStudent.reset();
    });

  }

  removeMessage(){
    this.message = false;
  }

  initEditStudent(){
    //error before this: Property 'id' comes from an index signature, so it must be accessed with ['id'].
    //console.log(this.router.snapshot.params['id']);
    this.student.getStudentById(this.router.snapshot.params['id']).subscribe((result: any) => {
      console.log("result: ", result);
      this.editStudent = new FormGroup({
        name: new FormControl( result['name'] ),
        email: new FormControl( result['email'] )
      });
    });
  }

}