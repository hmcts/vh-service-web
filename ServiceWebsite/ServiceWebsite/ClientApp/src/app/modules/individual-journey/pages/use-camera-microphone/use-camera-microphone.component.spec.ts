import { UseCameraMicrophoneComponent } from './use-camera-microphone.component';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { TestModuleMetadata, async,TestBed,ComponentFixture } from '@angular/core/testing';
import { MediaAccessService } from '../../services/media-access.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('UseCameraMicrophoneComponent', () => {
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj<Location>('Location', ['handle']);
  const mediaAccessService = jasmine.createSpyObj<MediaAccessService>(['requestAccess']);
  let component: UseCameraMicrophoneComponent;
  let fixture: ComponentFixture<UseCameraMicrophoneComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UseCameraMicrophoneComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: MediaAccessService, useValue: mediaAccessService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCameraMicrophoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('can be created', () => {
    const mediaAccessService = jasmine.createSpyObj<MediaAccessService>(['requestAccess']);
    CanCreateComponent(UseCameraMicrophoneComponent,
      (config: TestModuleMetadata) => config.providers.push(
        { provide: MediaAccessService, useValue: mediaAccessService }
      ));
  });
});
