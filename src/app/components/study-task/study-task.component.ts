import { IonicModule } from '@ionic/angular';
import { Component, Input} from '@angular/core';
import { StudyTask } from 'src/app/store/models/study-task.model';

@Component({
  selector: 'app-study-task',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './study-task.component.html',
  styleUrls: ['./study-task.component.scss'],
})
export class StudyTaskComponent {

    @Input({required: true}) task!: StudyTask;

    constructor() { }

}
