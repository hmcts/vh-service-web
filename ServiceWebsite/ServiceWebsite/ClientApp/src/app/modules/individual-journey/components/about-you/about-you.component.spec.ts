import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutYouComponent } from './about-you.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('AboutYouComponent', () => {
  let component: AboutYouComponent;
  let fixture: ComponentFixture<AboutYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutYouComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
