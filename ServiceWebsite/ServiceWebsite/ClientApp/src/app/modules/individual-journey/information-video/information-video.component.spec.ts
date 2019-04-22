import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationVideoComponent } from './information-video.component';

describe('InformationVideoComponent', () => {
  let component: InformationVideoComponent;
  let fixture: ComponentFixture<InformationVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
