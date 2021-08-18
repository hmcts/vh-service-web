import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';
import { Config } from 'src/app/modules/shared/models/config';
import { ConfigService } from 'src/app/services/config.service';
import { ParticipantSuitabilityModel, SelfTestAnswers } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { CheckYourComputerComponent } from './check-your-computer.component';

describe('CheckYourComputerComponent', () => {
    let journey: jasmine.SpyObj<JourneyBase>;
    let model: ParticipantSuitabilityModel;
    let deviceType: jasmine.SpyObj<DeviceType>;
    let routerSpy: jasmine.SpyObj<Router>;
    let configServiceSpy: jasmine.SpyObj<ConfigService>;
    const clientSettings = new Config();

    beforeEach(() => {
        journey = jasmine.createSpyObj<JourneyBase>(['goto']);
        model = new ParticipantSuitabilityModel();
        model.selfTest = new SelfTestAnswers();
        deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet', 'isIpad']);
        routerSpy = jasmine.createSpyObj<Router>(['navigate']);
        configServiceSpy = jasmine.createSpyObj<ConfigService>('ConfigService', ['getClientSettings']);
        configServiceSpy.getClientSettings.and.returnValue(of(clientSettings));
    });

    it(`should submit and go to ${SelfTestJourneySteps.SignBackIn} if answering no`, async () => {
        const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy, configServiceSpy);
        component.choice.setValue(false);
        await component.submit();
        expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SignBackIn);
    });

    it(`should submit and go to ${SelfTestJourneySteps.SignInOnComputer} if answering yes and device type is mobile`, async () => {
        deviceType.isMobile.and.returnValue(true);
        deviceType.isTablet.and.returnValue(false);
        const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy, configServiceSpy);
        component.choice.setValue(true);
        await component.submit();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/sign-in-on-computer']);
    });

    it(`should submit and go to ${SelfTestJourneySteps.SignInOnComputer} if answering yes and device type is tablet`, async () => {
        deviceType.isMobile.and.returnValue(false);
        deviceType.isTablet.and.returnValue(true);
        deviceType.isIpad.and.returnValue(false);
        const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy, configServiceSpy);
        component.choice.setValue(true);
        await component.submit();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/sign-in-on-computer']);
    });

    it(`should submit and go to ${SelfTestJourneySteps.SwitchOnCameraAndMicrophone} if answering yes and device type is mobile with mobile support is enabled`, async () => {
        clientSettings.enable_mobile_support = true;
        configServiceSpy.getClientSettings.and.returnValue(of(clientSettings));
        deviceType.isMobile.and.returnValue(true);
        deviceType.isTablet.and.returnValue(false);
        const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy, configServiceSpy);
        component.ngOnInit();
        component.choice.setValue(true);
        await component.submit();
        expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
    });

    it(`should submit and go to ${SelfTestJourneySteps.SwitchOnCameraAndMicrophone} if answering yes and device type is tablet with mobile support is enabled`, async () => {
        clientSettings.enable_mobile_support = true;
        deviceType.isMobile.and.returnValue(false);
        deviceType.isTablet.and.returnValue(true);
        deviceType.isIpad.and.returnValue(false);
        configServiceSpy.getClientSettings.and.returnValue(of(clientSettings));
        const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy, configServiceSpy);
        component.ngOnInit();
        component.choice.setValue(true);
        await component.submit();
        expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
    });

    it(`should submit and go to ${SelfTestJourneySteps.SwitchOnCameraAndMicrophone}
   if answering yes and device type is iPAd`, async () => {
        deviceType.isMobile.and.returnValue(false);
        deviceType.isTablet.and.returnValue(true);
        deviceType.isIpad.and.returnValue(true);
        const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy, configServiceSpy);
        component.choice.setValue(true);
        await component.submit();
        expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
    });

    it('should load any previous value', () => {
        model.selfTest.checkYourComputer = false;
        const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy, configServiceSpy);
        component.ngOnInit();
        expect(component.choice.value).toBe(false);
    });

    it('should not redirect on invalid form', async () => {
        const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy, configServiceSpy);
        await component.submit();
        expect(journey.goto).not.toHaveBeenCalled();
    });

    it('unsubcribes on destroy event', async () => {
        const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy, configServiceSpy);
        component.$subcriptions.push(new Subscription());
        component.$subcriptions.push(new Subscription());
        expect(component.$subcriptions[0].closed).toBeFalsy();

        component.ngOnDestroy();

        expect(component.$subcriptions[0].closed).toBeTruthy();
        expect(component.$subcriptions[1].closed).toBeTruthy();
    });
});
