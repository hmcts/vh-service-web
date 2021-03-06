import { TestBed } from '@angular/core/testing';
import { ShowDetailsComponent } from './show-details.component';
import { By } from '@angular/platform-browser';

describe('ShowDetailsComponent', () => {
  it('should expand details when clicked', async () => {
    TestBed.configureTestingModule({
      declarations: [ShowDetailsComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ShowDetailsComponent);
    const component = fixture.componentInstance;
    component.textArray = [ 'test text' ];
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.govuk-details__summary'));
    expect(element).toBeTruthy();
    element.nativeElement.click();
    fixture.detectChanges();

    const detailsElement = fixture.debugElement.query(By.css('.govuk-details__text'));
    expect(detailsElement).toBeTruthy();
    expect(detailsElement.nativeElement.innerText).toContain('test text');
  });
});
