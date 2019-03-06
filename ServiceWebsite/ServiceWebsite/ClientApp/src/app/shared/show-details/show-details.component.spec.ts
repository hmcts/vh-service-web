import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowDetailsComponent } from './show-details.component';

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ShowDetailsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
  it('should show details', async () => {
    component.showDetails();
    fixture.detectChanges();
    expect(component.showTextDetails).toBeTruthy();

  });
  it('should not show details', async () => {
    component.showDetails();
    fixture.detectChanges();
    component.showDetails();
    expect(component.showTextDetails).toBeFalsy();

  });
});
