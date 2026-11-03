import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { HomePage } from './home.page';
import { selectActiveTopics } from 'src/app/store/topics/topics.selectors';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomePage],
            providers: [
                provideRouter([]),
                provideMockStore({
                    selectors: [
                        { selector: selectActiveTopics, value: [] }
                    ]
                })
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
