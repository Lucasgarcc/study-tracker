import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { selectActiveTopics } from '../../store/topics/topics.selectors';
import { TopicDetailPage } from '../topic-detail/topic-detail.page';

import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
        RouterLink,
        CommonModule,
        FormsModule,
        CommonModule,
        IonicModule,
        ExploreContainerComponentModule
    ]
})
export class HomePage {

    constructor() { };
    private store = inject(Store)
    private router = inject(Router);

    activeTopics$ = this.store.select(selectActiveTopics);

    /**
     * Calculate the icon name based on the topic category.
     * @param catergory 
     * @returns 
     */
    getCategoryIcon(catergory: string): string {

        switch (catergory.toLocaleLowerCase()) {
        case 'frontend': return 'code-slash-outline';
        case 'architecture': return 'git-network-outline';
        case 'reactive': return 'flash-outline';
        case 'backend': return 'server-outline';
        default: return 'layers-outline';
        }

    }


    /**
     * Navigate to the topic detail page for the given topic ID.
     * @param id The ID of the topic to navigate to.
     */
    openTopicDetail(id: string) {
        this.router.navigate([TopicDetailPage, id]);
    }

}