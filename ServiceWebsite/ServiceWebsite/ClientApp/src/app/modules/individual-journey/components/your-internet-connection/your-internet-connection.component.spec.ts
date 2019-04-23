import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourInternetConnectionComponent } from './your-internet-connection.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('YourInternetConnectionComponent', () => {
  let component: YourInternetConnectionComponent;
  let fixture: ComponentFixture<YourInternetConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourInternetConnectionComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourInternetConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
