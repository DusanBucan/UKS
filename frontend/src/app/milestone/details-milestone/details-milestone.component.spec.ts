import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMilestoneComponent } from './details-milestone.component';

describe('DetailsMilestoneComponent', () => {
  let component: DetailsMilestoneComponent;
  let fixture: ComponentFixture<DetailsMilestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMilestoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
