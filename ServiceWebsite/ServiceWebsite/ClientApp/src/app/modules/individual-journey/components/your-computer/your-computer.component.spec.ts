import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourComputerComponent } from './your-computer.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('YourComputerComponent', () => {
  let component: YourComputerComponent;
  let fixture: ComponentFixture<YourComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourComputerComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
