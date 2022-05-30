import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientsZoneComponent } from './clients-zone.component';

describe('ClientsComponent', () => {
  let component: ClientsZoneComponent;
  let fixture: ComponentFixture<ClientsZoneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsZoneComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
