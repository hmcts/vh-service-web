import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChecklistFooterComponent } from './checklist-footer.component';
import { HearingService } from '../../services/hearing.service';
import { Hearing } from '../../models/hearing.model';
import { LocaleResources } from '../../shared/resources/locale-resources';
import { CONFIG } from '../../shared/config';


describe('ChecklistFooterComponent', () => {
  let component: ChecklistFooterComponent;
  let fixture: ComponentFixture<ChecklistFooterComponent>;
  const hearingServiceSpy: jasmine.SpyObj<HearingService> = jasmine.createSpyObj<HearingService>('HearingService',
                                                              ['getNextHearingDetails']);

  beforeEach(async(() => {
    hearingServiceSpy.getNextHearingDetails.and.returnValue(new Promise<Hearing>((resolve, reject) => { resolve(new Hearing()); }));

    TestBed.configureTestingModule({
      declarations: [ChecklistFooterComponent],
      providers: [{ provide: HearingService, useValue: hearingServiceSpy }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
  it('should show contact details for professional users', async () => {
    component.isUserProfessional = true;
    fixture.detectChanges();
    const element1 = fixture.debugElement.query(By.css('#professional-contact-details'));
    expect(element1.nativeElement.innerHTML).toContain('If you need to speak');

    const element2 = fixture.debugElement.query(By.css('#citizen-contact-details'));
    expect(element2).toBeNull();

  });
  it('should show contact details for citizen users', async () => {
    component.isUserProfessional = false;
    fixture.detectChanges();
    const element1 = fixture.debugElement.query(By.css('#professional-contact-details'));
    expect(element1).toBeNull();
    const element2 = fixture.debugElement.query(By.css('#citizen-contact-details'));
    expect(element2.nativeElement.innerHTML).toContain(LocaleResources[CONFIG.Locale].CitizenFooter.FooterTitle);
  });
});
