import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueToQuestionsComponent } from './continue-to-questions.component';
import { BackNavigationComponent } from 'src/app/back-navigation/back-navigation.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ErrorService } from 'src/app/services/error.service';
import { BeforeunloadStubComponent } from '../../../tests/component-stubs';

describe('ContinueToQuestionsComponent', () => {
  let component: ContinueToQuestionsComponent;
  let fixture: ComponentFixture<ContinueToQuestionsComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  let locationSpy: jasmine.SpyObj<Location>;
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContinueToQuestionsComponent,
        BackNavigationComponent,
        BeforeunloadStubComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueToQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
