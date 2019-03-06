import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNavigationComponent } from './back-navigation.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ErrorService } from '../services/error.service';

describe('BackNavigationComponent', () => {
  let component: BackNavigationComponent;
  let fixture: ComponentFixture<BackNavigationComponent>;

  let routerSpy: jasmine.SpyObj<Router>;
  let locationSpy: jasmine.SpyObj<Location>;
  let errorServiceStub: jasmine.SpyObj<ErrorService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackNavigationComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ErrorService, useValue: errorServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
