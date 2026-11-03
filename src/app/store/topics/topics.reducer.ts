import { createReducer, on } from '@ngrx/store';
import { Topic } from '../models/topic.model';
import { TopicsActions } from './topics.actions';

export interface TopicsState {
    topics: Topic[];
}

/**
 * 
 */
export const initialState: TopicsState = {
    topics: [
        {
            id: '1',
            title: 'Angular & Ionic',
            category: 'Frontend',
            progress: 75,
            completedTasks: 6,
            totalTasks: 8,
            lastStudied: 'Hoje',
            badgeColor: 'danger'
        }
    ]
};

/**
 * 
 */
export const topicsReducer = createReducer(
    initialState,
    on(TopicsActions.addTopic, (state, { topic }) => ({
        ...state,
        topics: [
            ...state.topics,
            {
                ...topic,
                id: crypto.randomUUID(),
                progress: topic.totalTasks > 0 ? Math.round((topic.completedTasks / topic.totalTasks) * 100) : 0
            }
        ]
    })),
    on(TopicsActions.deleteTopic, (state, { id }) => ({
        ...state,
        topics: state.topics.filter(t => t.id !== id)
    }))
);