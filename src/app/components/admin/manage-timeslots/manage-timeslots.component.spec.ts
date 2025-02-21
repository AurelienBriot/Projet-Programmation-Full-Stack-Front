import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTimeslotsComponent } from './manage-timeslots.component';

describe('ManageTimeslotsComponent', () => {
  let component: ManageTimeslotsComponent;
  let fixture: ComponentFixture<ManageTimeslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTimeslotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
