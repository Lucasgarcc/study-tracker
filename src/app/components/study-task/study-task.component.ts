import { Component, OnInit, Input} from '@angular/core';
import { StudyTask } from 'src/app/store/models/study-task.model';

@Component({
  selector: 'app-study-task',
  templateUrl: './study-task.component.html',
  styleUrls: ['./study-task.component.scss'],
})
export class StudyTaskComponent  implements OnInit {

    @Input({required: true}) task!: StudyTask;

    constructor() { }

    ngOnInit() {}

}
