import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Topic } from '../../store/models/topic.model';
import { selectAllTopics } from '../../store/topics/topics.selectors';
import { TopicsActions } from '../../store/topics/topics.actions';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


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

    constructor(private readonly router: Router,) { }

    private store = inject(Store);

    topics$: Observable<Topic[]> = this.store.select(selectAllTopics);

    newTitle: string = '';
    newCategory: string = 'English';

    /**
     * Add a new topic to the store if the title is not empty.
     * @returns 
     */
    addNewTopic() {

        if (!this.newTitle.trim()) return;

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
         * Navigate to the topic detail page for the given topic ID.
         * @param id The ID of the topic to navigate to.
         */
        openTopicDetail(id: string): void {
            this.router.navigate(['/topic-detail', id]);
    }
    

    /**
     * Delete a topic by its ID.
     * @param id 
     */
    deleteTopic(id: string) {
        this.store.dispatch(TopicsActions.deleteTopic({ id }))
    }
}
