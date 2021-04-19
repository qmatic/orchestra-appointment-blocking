import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmCreateBlockerModalComponent } from './qm-create-blocker-modal.component';

describe('QmCreateCustomerModalComponent', () => {
  let component: QmCreateBlockerModalComponent;
  let fixture: ComponentFixture<QmCreateBlockerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmCreateBlockerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmCreateBlockerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
