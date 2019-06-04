import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingDetailsHeaderComponent } from './hearing-details-header.component';

describe('HearingDetailsHeaderComponent', () => {
  let component: HearingDetailsHeaderComponent;
  let fixture: ComponentFixture<HearingDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingDetailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
