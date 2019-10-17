import { ContactUsComponent } from '../../modules/shared/contact-us/contact-us.component';
import { CrestBluePanelComponent } from '../../modules/shared/crest-blue-panel/crest-blue-panel.component';
import { SignInOnComputerComponent } from './sign-in-on-computer.component';
import { TestBed } from '@angular/core/testing';

describe('SignInOnComputerComponent', () => {
  it('can create component', () => {
    TestBed.configureTestingModule({
      declarations: [
        CrestBluePanelComponent,
        SignInOnComputerComponent,
        ContactUsComponent
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(SignInOnComputerComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
