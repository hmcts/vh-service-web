import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';
import { ChecklistService } from '../services/checklist.service';
import { DocumentRedirectService } from '../services/document-redirect.service';
import { Config } from '../models/config';
import { Constants } from '../shared/constants';
import { PageUrls } from '../shared/page-url.constants';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  let checklistService: jasmine.SpyObj<ChecklistService>;
  let documentRedirectService: jasmine.SpyObj<DocumentRedirectService>;

  const profileService: MockProfileService = new MockProfileService();

  const config = new Config('videoappurl', 'appInsightsKey');

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    documentRedirectService = jasmine.createSpyObj('DocumentRedirectService', ['to']);
    checklistService = jasmine.createSpyObj('ChecklistService', ['isUserRequiredToSubmitChecklist']);

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ProfileService, useValue: profileService },
        { provide: ChecklistService, useValue: checklistService },
        { provide: DocumentRedirectService, useValue: documentRedirectService },
        { provide: Config, useValue: config }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect to videoapp for judge', fakeAsync(() => {
    profileService.currentProfileIs('Judge');
    component.ngOnInit();
    tick();
    expect(documentRedirectService.to).toHaveBeenCalledWith(config.videoAppUrl);
  }));

  it('should redirect to citizen that does not need to answer checklist to videoapp', fakeAsync(() => {
    profileService.currentProfileIs(Constants.UserType.Citizen);
    checklistService.isUserRequiredToSubmitChecklist.and.returnValue(Promise.resolve(false));
    component.ngOnInit();
    tick();
    expect(documentRedirectService.to).toHaveBeenCalledWith(config.videoAppUrl);
  }));

  it('should redirect to professional user that does not need to answer checklist to videoapp', fakeAsync(() => {
    profileService.currentProfileIs(Constants.UserType.ProfessionalUser);
    checklistService.isUserRequiredToSubmitChecklist.and.returnValue(Promise.resolve(false));
    component.ngOnInit();
    tick();
    expect(documentRedirectService.to).toHaveBeenCalledWith(config.videoAppUrl);
  }));

  it('should redirect citizen to about hearings page when checklist has not been submitted', fakeAsync(() => {
    profileService.currentProfileIs(Constants.UserType.Citizen);
    checklistService.isUserRequiredToSubmitChecklist.and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    tick();
    expect(routerSpy.navigate).toHaveBeenCalledWith([PageUrls.AboutHearings]);
    expect(documentRedirectService.to).not.toHaveBeenCalled();
  }));

  it('should redirect professional user to checklist suitability when checklist has not been answered', fakeAsync(() => {
    profileService.currentProfileIs(Constants.UserType.ProfessionalUser);
    checklistService.isUserRequiredToSubmitChecklist.and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    tick();
    expect(routerSpy.navigate).toHaveBeenCalledWith([PageUrls.ChecklistStart]);
    expect(documentRedirectService.to).not.toHaveBeenCalled();
  }));
});
