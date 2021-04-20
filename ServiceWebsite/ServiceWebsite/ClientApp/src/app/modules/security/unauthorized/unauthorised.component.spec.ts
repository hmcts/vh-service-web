import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {UnauthorisedComponent} from './unauthorised.component';
import {ContactUsComponent} from '../../shared/contact-us/contact-us.component';

describe('UnauthorisedComponent', () => {
  let component: UnauthorisedComponent;
  let fixture: ComponentFixture<UnauthorisedComponent>;

  beforeEach(
    waitForAsync (() => {
    TestBed.configureTestingModule({
      declarations: [
        UnauthorisedComponent,
        ContactUsComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
