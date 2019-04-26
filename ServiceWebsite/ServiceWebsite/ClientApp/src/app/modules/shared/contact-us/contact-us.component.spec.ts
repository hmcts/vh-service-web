import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContactUsComponent } from './contact-us.component';

describe('ContactUsComponent', () => {
  it('should expand details when clicked', async () => {
    TestBed.configureTestingModule({
      declarations: [ContactUsComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ContactUsComponent);
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.govuk-details__summary'));
    expect(element).toBeTruthy();
    element.nativeElement.click();
    fixture.detectChanges();

    const detailsElement = fixture.debugElement.query(By.css('.govuk-details__text'));
    expect(detailsElement).toBeTruthy();
  });
});
