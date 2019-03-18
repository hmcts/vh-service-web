import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistStepsComponent } from './checklist-steps.component';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';

describe('ChecklistStepsComponent', () => {
  let component: ChecklistStepsComponent;
  let fixture: ComponentFixture<ChecklistStepsComponent>;

  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj<Location>('Location', ['handle']);
  const errorServiceStub: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChecklistStepsComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ErrorService, useValue: errorServiceStub },
        { provide: ProfileService, useClass: MockProfileService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
