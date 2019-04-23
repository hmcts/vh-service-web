import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTheCourtDecideComponent } from './help-the-court-decide.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('HelpTheCourtDecideComponent', () => {
  let component: HelpTheCourtDecideComponent;
  let fixture: ComponentFixture<HelpTheCourtDecideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpTheCourtDecideComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpTheCourtDecideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
