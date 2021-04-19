import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmBlockerListComponent } from './qm-blocker-list.component';

describe('QmBookingFlowComponent', () => {
  let component: QmBlockerListComponent;
  let fixture: ComponentFixture<QmBlockerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmBlockerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmBlockerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
