import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyLinkComponent } from './study-link.component';

describe('StudyLinkComponent', () => {
  let fixture: ComponentFixture<StudyLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StudyLinkComponent] }).compileComponents();
    fixture = TestBed.createComponent(StudyLinkComponent);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

});
