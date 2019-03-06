import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { UseSameComputerSignoutComponent } from './use-same-computer-signout.component';
import { ChecklistFooterStubComponent } from 'src/tests/component-stubs';
import { BackNavigationComponent } from 'src/app/back-navigation/back-navigation.component';
import { ChecklistStepsComponent } from 'src/app/checklist-steps/checklist-steps.component';
import { Location } from '@angular/common';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';

describe('UseSameComputerSignoutComponent', () => {
  let component: UseSameComputerSignoutComponent;
  let fixture: ComponentFixture<UseSameComputerSignoutComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  let locationSpy: jasmine.SpyObj<Location>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseSameComputerSignoutComponent,
        ChecklistFooterStubComponent,
        ChecklistStepsComponent,
        BackNavigationComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
        { provide: ProfileService, useClass: MockProfileService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseSameComputerSignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
