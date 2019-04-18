import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorisedComponent } from './unauthorised.component';
import { ErrorFooterComponent } from '../../shared/error-footer/error-footer.component';

describe('UnauthorisedComponent', () => {
  let component: UnauthorisedComponent;
  let fixture: ComponentFixture<UnauthorisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UnauthorisedComponent,
        ErrorFooterComponent
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
