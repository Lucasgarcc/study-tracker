import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TopicDetailPage } from './topic-detail.page';

describe('TopicDetailPage', () => {
    let component: TopicDetailPage;
    let fixture: ComponentFixture<TopicDetailPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
        imports: [TopicDetailPage],
        }).compileComponents();

        fixture = TestBed.createComponent(TopicDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
