import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Topic } from '../store/topic.model';
import { selectAllTopics } from '../store/topics/topics.selectors';
import { TopicsActions } from '../store/topics/topics.actions';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-studies',
  templateUrl: 'studies.page.html',
  styleUrls: ['studies.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class StudiesPage {

    constructor() {}

    private store = inject(Store);

    topics$: Observable<Topic[]> = this.store.select(selectAllTopics);

    newTitle: string = '';
    newCategory: string = 'English';

    /**
     * 
     * @returns 
     */
    addNewTopic() {

        if(!this.newTitle.trim()) return;

        this.store.dispatch(
            TopicsActions.addTopic({
                topic: {
                    title: this.newTitle,
                    category: this.newCategory,
                    completedTasks: 0,
                    totalTasks: 5, 
                    lastStudied: 'Hoje',
                    badgeColor: 'primary',
                    progress: 0
                }
            })
        );


        this.newTitle = '';

    };

    /**
     * 
     * @param id 
     */
    deleteTopic(id: string) {
        this.store.dispatch(TopicsActions.deleteTopic({id}))  
    }
}
