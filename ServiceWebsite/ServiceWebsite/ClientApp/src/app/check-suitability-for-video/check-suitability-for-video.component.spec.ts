import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSuitabilityForVideoComponent } from './check-suitability-for-video.component';
import { ChecklistFooterComponent } from '../shared/checklist-footer/checklist-footer.component';
import { ProfileService } from '../services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';
import { Router } from '@angular/router';
import { HearingService } from '../services/hearing.service';
import { ChecklistFooterStubComponent } from 'src/tests/component-stubs';

describe('CheckSuitabilityForVideoComponent', () => {
  let component: CheckSuitabilityForVideoComponent;
  let fixture: ComponentFixture<CheckSuitabilityForVideoComponent>;

  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckSuitabilityForVideoComponent,
        ChecklistFooterStubComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ProfileService, useClass: MockProfileService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSuitabilityForVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
