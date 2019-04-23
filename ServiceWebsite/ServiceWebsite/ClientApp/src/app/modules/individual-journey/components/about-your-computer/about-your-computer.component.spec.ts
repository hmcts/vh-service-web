import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutYourComputerComponent } from './about-your-computer.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('AboutYourComputerComponent', () => {
  let component: AboutYourComputerComponent;
  let fixture: ComponentFixture<AboutYourComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutYourComputerComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutYourComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
