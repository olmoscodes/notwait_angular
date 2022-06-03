import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsQueueComponent } from './clients-queue.component';

describe('AddQueueComponent', () => {
  let component: ClientsQueueComponent;
  let fixture: ComponentFixture<ClientsQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
