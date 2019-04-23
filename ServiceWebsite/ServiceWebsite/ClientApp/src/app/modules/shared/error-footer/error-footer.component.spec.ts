import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFooterComponent } from './error-footer.component';

describe('ErrorFooterComponent', () => {
  let component: ErrorFooterComponent;
  let fixture: ComponentFixture<ErrorFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
