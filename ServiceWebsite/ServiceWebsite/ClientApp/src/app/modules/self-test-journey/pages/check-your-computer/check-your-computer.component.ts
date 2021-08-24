import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';
import { ConfigService } from 'src/app/services/config.service';
import { Paths } from '../../../../paths';
import { SuitabilityChoicePageBaseComponent } from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
    selector: 'app-check-your-computer',
    templateUrl: './check-your-computer.component.html',
    styles: []
})
export class CheckYourComputerComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit, OnDestroy {
    isRepresentative: boolean;
    isIndividual: boolean;
    mobileSupportEnabled = false;
    $subcriptions: Subscription[] = [];

    constructor(
        journey: JourneyBase,
        private model: ParticipantSuitabilityModel,
        private deviceType: DeviceType,
        private router: Router,
        private configService: ConfigService
    ) {
        super(journey);
    }

    ngOnInit(): void {
        this.choice.setValue(this.model.selfTest.checkYourComputer);
        this.isRepresentative = this.journey.journeyName === 'Representative';
        this.isIndividual = this.journey.journeyName === 'Individual';
        this.setupSubscribers();
    }

    ngOnDestroy(): void {
        this.$subcriptions.forEach(subcription => {
            if (subcription) {
                subcription.unsubscribe();
            }
        });
    }

    setupSubscribers() {
        this.$subcriptions.push(
            this.configService
                .getClientSettings()
                .pipe(first())
                .subscribe(clientSettings => {
                    this.mobileSupportEnabled = clientSettings.enable_mobile_support;
                })
        );
    }

    protected bindModel(): void {
        this.model.selfTest.checkYourComputer = this.choice.value;
    }

    async submit(): Promise<void> {
        if (!this.trySubmit()) {
            return;
        }

        if (!this.model.selfTest.checkYourComputer) {
            this.journey.goto(SelfTestJourneySteps.SignBackIn);
            return;
        }

        if (this.deviceType.isMobile() && !this.mobileSupportEnabled) {
            this.router.navigate([`/${Paths.SignInOnComputer}`]);
            return;
        }

        if (this.deviceType.isTablet() && !this.deviceType.isIpad() && !this.mobileSupportEnabled) {
            this.router.navigate([`/${Paths.SignInOnComputer}`]);
            return;
        }

        this.journey.goto(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
    }
}
