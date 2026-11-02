import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { selectActiveTopics } from '../store/topics/topics.selectors';
import { TopicDetailPage } from '../pages/topic-detail/topic-detail.page';
import { TopicsActions } from '../store/topics/topics.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule, 
    ExploreContainerComponentModule
  ]
})
export class HomePage {

    constructor() {};
    private store = inject(Store)
    private router = inject(Router);

	activeTopics$ = this.store.select(selectActiveTopics);

	/**
	 * 
	 * @param catergory 
	 * @returns 
	 */
	getCategoryIcon(catergory: string): string {

		switch(catergory.toLocaleLowerCase()) {
			case 'frontend': return 'code-slash-outline';
			case 'architecture': return 'git-network-outline';
			case 'reactive': return 'flash-outline';
			case 'backend': return 'server-outline';
			default: return 'layers-outline';
		}

	}

	// Navega para a página de detalhes do tópico ao clicar no gadget
	openTopicDetail(id: string) {
		this.router.navigate(['/topic-detail', id]);
	}
}