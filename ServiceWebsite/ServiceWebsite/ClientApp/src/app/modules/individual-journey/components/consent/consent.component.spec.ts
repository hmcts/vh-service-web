import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentComponent } from './consent.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: ComponentFixture<ConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
