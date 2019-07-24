import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { SelfTestJourneyComponentTestBed } from '../self-test-base-component/self-test-component-test-bed.spec';
import { CrestBluePanelComponent } from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import { TestYourEquipmentComponent } from './test-your-equipment.component';
import { ContinuableComponentFixture } from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { MockLogger } from '../../../../testing/mocks/mock-logger';
import { Logger } from '../../../../services/logger';
import { VideoWebService } from '../../services/video-web.service';
import { UserMediaService } from '../../services/user-media.service';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { TokenResponse, ParticipantResponse } from '../../../../services/clients/api-client';
import { Config } from '../../../shared/models/config';
import { UserMediaStreamService } from '../../services/user-media-stream.service';
import { MutableIndividualSuitabilityModel } from '../../../individual-journey/mutable-individual-suitability.model';
import { SelfTestAnswers } from '../../../base-journey/participant-suitability.model';
declare var PexRTC: any;

@Component({
  selector: 'app-mic-visualiser',
  template: ''
})
class StubMicVisualiserComponent {
  @Input() stream: MediaStream;
}

const journey = jasmine.createSpyObj<JourneyBase>(['goto']);
const videoWebServiceMock = jasmine.createSpyObj<VideoWebService>(['getToken', 'getCurrentParticipantId']);
videoWebServiceMock.getToken.and.returnValue(of(new TokenResponse()));
videoWebServiceMock.getCurrentParticipantId.and.returnValue(of(new ParticipantResponse()));

const configServiceMock = jasmine.createSpyObj<ConfigService>(['load']);
configServiceMock.load.and.returnValue(of(new Config()));

const userMediaStreamServiceMock = jasmine.createSpyObj<UserMediaStreamService>(['getStreamForMic']);
userMediaStreamServiceMock.getStreamForMic.and.returnValue(Promise.resolve(new MediaStream()));

describe('TestYourEquipmentComponent', () => {
  it('can continue', () => {

    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: TestYourEquipmentComponent,
      journey: journey,
      declarations: [CrestBluePanelComponent, StubMicVisualiserComponent],
      providers: [{ provide: Logger, useClass: MockLogger },
      { provide: VideoWebService, useValue: videoWebServiceMock },
      { provide: UserMediaStreamService, useValue: userMediaStreamServiceMock },
      { provide: ConfigService, useValue: configServiceMock },
        UserMediaService
      ],
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.CameraWorking);
  });
});

describe('TestYourEquipmentComponent functionality', () => {
  let journeyObj: jasmine.SpyObj<JourneyBase>;
  let model: MutableIndividualSuitabilityModel;
  let component: TestYourEquipmentComponent;

  beforeEach(() => {
    journeyObj = jasmine.createSpyObj<JourneyBase>(['goto', 'submitQuestionnaire']);
    model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();
    component = new TestYourEquipmentComponent(journeyObj, model,
      new UserMediaService(), userMediaStreamServiceMock, videoWebServiceMock,
      configServiceMock, new MockLogger());

  });

  it('should pexip make a call', async () => {
    component.token = new TokenResponse({ expires_on: '06/07/22', token: '4556' });
    component.call();
    expect(component.didTestComplete).toBeFalsy();
  });
});
