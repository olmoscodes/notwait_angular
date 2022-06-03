import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BusinessZoneComponent } from './business-zone.component';

describe('BusinessComponent', () => {
  let component: BusinessZoneComponent;
  let fixture: ComponentFixture<BusinessZoneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessZoneComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
