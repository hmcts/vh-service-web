import { MediaErrorComponent } from './media-error.component';
import { ComponentFixture, TestBed, async, waitForAsync } from '@angular/core/testing';
import { ContactUsComponent } from 'src/app/modules/shared/contact-us/contact-us.component';

describe('MediaErrorComponent', () => {
  let component: MediaErrorComponent;
  let fixture: ComponentFixture<MediaErrorComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MediaErrorComponent, ContactUsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




