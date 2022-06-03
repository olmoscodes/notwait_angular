import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximityInfoComponent } from './proximity-info.component';

describe('ProximityInfoComponent', () => {
  let component: ProximityInfoComponent;
  let fixture: ComponentFixture<ProximityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProximityInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
