import { ContactUsComponent } from '../../../shared/contact-us/contact-us.component';
import { CrestBluePanelComponent } from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import { SignBackInComponent } from './sign-back-in.component';
import { TestBed } from '@angular/core/testing';

describe('SignBackInComponent', () => {
  it('can create component', () => {
    TestBed.configureTestingModule({
      declarations: [
        CrestBluePanelComponent,
        SignBackInComponent,
        ContactUsComponent
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(SignBackInComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
