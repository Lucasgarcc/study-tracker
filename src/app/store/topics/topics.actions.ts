import { createActionGroup, props } from '@ngrx/store';
import { Topic } from '../topic.model';

/**
 * 
 */
export const TopicsActions = createActionGroup({
  source: 'Topics',
  events: {
    'Add Topic': props<{ topic: Omit<Topic, 'id'> }>(),
    'Delete Topic': props<{ id: string }>()
  }
});