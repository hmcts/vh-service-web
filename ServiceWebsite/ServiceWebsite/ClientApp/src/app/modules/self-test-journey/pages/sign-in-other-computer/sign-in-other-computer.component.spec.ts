import { ContactUsComponent } from './../../../shared/contact-us/contact-us.component';
import { CrestBluePanelComponent } from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import { SignInOtherComputerComponent } from './sign-in-other-computer.component';
import { TestBed } from '@angular/core/testing';
import { JourneyBase } from 'src/app/modules/base-journey/journey-base';

describe('SignInOtherComputerComponent', () => {
  it('can create component', () => {
    TestBed.configureTestingModule({
      declarations: [
        CrestBluePanelComponent,
        SignInOtherComputerComponent,
        ContactUsComponent
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(SignInOtherComputerComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
