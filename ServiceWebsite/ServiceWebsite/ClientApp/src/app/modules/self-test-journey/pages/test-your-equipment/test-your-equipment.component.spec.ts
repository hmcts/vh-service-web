import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { SelfTestJourneyComponentTestBed } from '../self-test-base-component/self-test-component-test-bed.spec';
import { CrestBluePanelComponent } from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import { TestYourEquipmentComponent } from './test-your-equipment.component';
import { ContinuableComponentFixture } from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { MockLogger } from '../../../../testing/mocks/mock-logger';
import { Logger } from '../../../../services/logger';
import { VideoWebService } from '../../services/video-web-service';
import { UserMediaService } from '../../services/user-media.service';
import {of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../services/config.service';
import { TokenResponse } from '../../../../services/clients/api-client';

@Component({
  selector: 'app-mic-visualiser',
  template: ''
})
class StubMicVisualiserComponent {
  @Input() stream: MediaStream;
}

describe('TestYourEquipmentComponent', () => {
  it('can continue', () => {
    const journey = jasmine.createSpyObj<JourneyBase>(['goto']);
    const videoWebServiceMock = jasmine.createSpyObj<VideoWebService>(['getToken']);
    videoWebServiceMock.getToken.and.returnValue(of(new TokenResponse()));

    const configServiceMock = jasmine.createSpyObj<ConfigService>(['load']);

    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: TestYourEquipmentComponent,
      journey: journey,
      declarations: [CrestBluePanelComponent, StubMicVisualiserComponent],
      providers: [{ provide: Logger, useClass: MockLogger },
      { provide: VideoWebService, useValue: videoWebServiceMock },
        UserMediaService,
      { provide: ConfigService, useValue: configServiceMock }],
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.CameraWorking);
  });
});
