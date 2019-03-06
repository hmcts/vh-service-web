import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSignoutPopupComponent } from './confirmation-signout-popup.component';

describe('ConfirmationSignoutPopupComponent', () => {
  let component: ConfirmationSignoutPopupComponent;
  let fixture: ComponentFixture<ConfirmationSignoutPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationSignoutPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationSignoutPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create confirmation popup component', () => {
    expect(component).toBeTruthy();
  });
});
