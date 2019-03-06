import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistThankYouComponent } from './checklist-thank-you.component';
import { ProfileService } from '../services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';
import { ChecklistFooterStubComponent } from 'src/tests/component-stubs';
import { Router } from '@angular/router';

describe('ChecklistThankYouComponent', () => {
 let component: ChecklistThankYouComponent;
 let fixture: ComponentFixture<ChecklistThankYouComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [
       ChecklistThankYouComponent,
       ChecklistFooterStubComponent,
       ChecklistFooterStubComponent
     ],
     providers: [
       { provide: ProfileService, useClass: MockProfileService },
       { provide: Router, useValue: routerSpy}
     ]
   })
     .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(ChecklistThankYouComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeTruthy();
 });
});
