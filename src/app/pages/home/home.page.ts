import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { selectActiveTopics } from '../../store/topics/topics.selectors';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TopicsActions } from 'src/app/store/topics/topics.actions';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CommonModule,
        IonicModule,
        ExploreContainerComponentModule
    ]
})
export class HomePage implements OnInit  {

    constructor() { };

    private store = inject(Store)
    private router = inject(Router);

    readonly activeTopics$ = this.store.select(selectActiveTopics);

    ngOnInit(): void {
        this.store.dispatch(TopicsActions.loadTopics());
    }

    /**
     * Calculate the icon name based on the topic category.
     * @param catergory 
     * @returns 
     */
    getCategoryIcon(catergory: string): string {

        switch (catergory.toLocaleLowerCase()) {

            case 'frontend': 
                return 'code-slash-outline';
            case 'architecture':
                return 'git-network-outline';
            case 'reactive':
                return 'flash-outline';
            case 'backend': 
                return 'server-outline';
            default: 
                return 'layers-outline';
    
        }

    }

    /**
     * Navigate to the topic detail page for the given topic ID.
     * @param id The ID of the topic to navigate to.
     */
    openTopicDetail(id: string) {
        this.router.navigate(['/topic-detail', id]);
    }

}