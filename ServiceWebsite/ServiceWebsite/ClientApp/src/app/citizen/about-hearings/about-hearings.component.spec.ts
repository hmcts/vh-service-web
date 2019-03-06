import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHearingsComponent } from './about-hearings.component';
import { Router } from '@angular/router';
import { BeforeunloadStubComponent } from 'src/tests/component-stubs';

describe('AboutHearingsComponent', () => {
  let component: AboutHearingsComponent;
  let fixture: ComponentFixture<AboutHearingsComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutHearingsComponent,
        BeforeunloadStubComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutHearingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
