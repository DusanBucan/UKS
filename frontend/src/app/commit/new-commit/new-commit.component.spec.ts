import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommitComponent } from './new-commit.component';

describe('NewCommitComponent', () => {
  let component: NewCommitComponent;
  let fixture: ComponentFixture<NewCommitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCommitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
