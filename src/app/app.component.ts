import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';
import { ApiResponseModel, Itask, task } from './model/task';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DatePipe,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  taskObj : task = new task();
  taskList : Itask[]=[];
  masterservice = inject(MasterService);
 ngOnInit(): void {
   this.loadAllTask();
 }
 loadAllTask()
 {
  this.masterservice.getAllTaskList().subscribe((res:ApiResponseModel)=>{
  this.taskList = res.data;
  })
 }


  title = 'angular_17_todo_app_with_api';
  addTask() {
    this.masterService.addNewTask(this.taskObj).subscribe((res: ApiResponseModel) => {
      if (res.result) {
        alert('Task Created Successfully');
        this.loadAllTask();
        this.taskObj = new task();
      } else {
        alert('Failed to create task');
      }
    }, error => {
      alert('Error occurred while creating task');
    });
  }
  onEdit(item:task)
  {  
    this.taskObj=item;
    setTimeout(() => {
      const dat = new Date(this.taskObj.dueDate);
      const day = ('0'+ dat.getDate()).slice(-2);
      const month =('0' + (dat.getMonth()+1)).slice(-2);
      const today =  dat.getFullYear()+ '-' + (month) + '-' +(day) ;
     (<HTMLInputElement>document.getElementById('txtDate')).value=today;
    }, 1000);
  }
  updateTask()
  {
    this.masterService.updateTask(this.taskObj).subscribe((res: ApiResponseModel) => {
      if (res.result) {
        alert('Task updated Successfully');
        this.loadAllTask();
        this.taskObj = new task();
      } else {
        alert('Failed to create task');
      }
    }, error => {
      alert('Error occurred while creating task');
    });
  }
  onDelete(id:number)
  {
    const isConfirm = confirm("Are You Sure want to Delete")
    if(isConfirm)
    {
      this.masterService.deleteTask(id).subscribe((res: ApiResponseModel) => {
        if (res.result) {
          alert('Task Delelted Successfully');
          this.loadAllTask();
         
        } else {
          alert('Failed to create task');
        }
      }, error => {
        alert('Error occurred while creating task');
      });
    }
   
  }
  constructor(private masterService: MasterService) { }
}
