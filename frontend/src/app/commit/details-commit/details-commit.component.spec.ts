import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommitComponent } from './details-commit.component';

describe('DetailsCommitComponent', () => {
  let component: DetailsCommitComponent;
  let fixture: ComponentFixture<DetailsCommitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCommitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
