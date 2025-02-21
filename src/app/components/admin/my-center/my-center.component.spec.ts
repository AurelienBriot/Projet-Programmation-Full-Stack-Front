import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCenterComponent } from './my-center.component';

describe('MyCenterComponent', () => {
  let component: MyCenterComponent;
  let fixture: ComponentFixture<MyCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
