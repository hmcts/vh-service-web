import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackNavigationComponent } from './back-navigation.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('BackNavigationComponent', () => {
  let component: BackNavigationComponent;
  let fixture: ComponentFixture<BackNavigationComponent>;

  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj<Location>('Location', ['back']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BackNavigationComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
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
