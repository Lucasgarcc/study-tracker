import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyNoteComponent } from './study-note.component';

describe('StudyNoteComponent', () => {
  let fixture: ComponentFixture<StudyNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StudyNoteComponent] }).compileComponents();
    fixture = TestBed.createComponent(StudyNoteComponent);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

});
