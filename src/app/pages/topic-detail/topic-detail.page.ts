// src/app/pages/topic-detail/topic-detail.page.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllTopics } from '../../store/topics/topics.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.page.html',
  styleUrls: ['./topic-detail.page.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TopicDetailPage implements OnInit {
    topicId!: string;
    private route = inject(ActivatedRoute);
    private store = inject(Store);

   /**
    *  select the topic from the store based on the topicId. The topic$ observable will emit the topic object whenever it changes in the store.
    */
    topic$ = this.store.select(selectAllTopics).pipe(
        map(topics => topics.find(t => t.id === this.topicId))
    );

    /**
     *  route snapshot is used to get the topicId from the route parameters when the component is initialized. The topicId is then used to select the topic from the store.
     */
    ngOnInit() {
        this.topicId = this.route.snapshot.paramMap.get('id')!;
    }
}