import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlanningComponent } from './manage-planning.component';

describe('ManagePlanningComponent', () => {
  let component: ManagePlanningComponent;
  let fixture: ComponentFixture<ManagePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
