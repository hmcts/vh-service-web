import { ParticipantJourneySteps as Steps } from '../participant-journey-steps';
import { Config } from '../../shared/models/config';
import { of, Subject } from 'rxjs';
import { JourneyRoutingListenerService } from './journey-routing-listener.service';
import { Event, ResolveEnd, Router } from '@angular/router';
import { Paths as AppPaths } from '../../../paths';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';
import { JourneyBase } from '../journey-base';
import { JourneyStep } from '../journey-step';
import { ParticipantJourneyStepComponentBindings } from './participant-journey-component-bindings';
import { EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Logger } from '../../../services/logger';
import { Title } from '@angular/platform-browser';
import { ConfigService } from 'src/app/services/config.service';

class JourneyStepComponentBindingsStub extends ParticipantJourneyStepComponentBindings {
    readonly initialStep = Steps.CheckingVideoHearing;
    readonly finalStep = Steps.ThankYou;
    readonly bindings = new Map<JourneyStep, string>();
    constructor() {
        super();
        this.bindings.set(Steps.CheckingVideoHearing, Paths.CheckingVideoHearing);
        this.bindings.set(Steps.ThankYou, Paths.ThankYou);
    }
}

export const Paths = {
    CheckingVideoHearing: 'checking-video-hearing',
    ThankYou: 'thank-you'
};
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

describe('JourneyRoutingListenerService', () => {
    let service: JourneyRoutingListenerService;
    let configServiceSpy: jasmine.SpyObj<ConfigService>;
    let journey: jasmine.SpyObj<JourneyBase>;
    let router: jasmine.SpyObj<Router>;
    let location: jasmine.SpyObj<Location>;
    let routerEvents: Subject<Event>;
    let stepEvents: EventEmitter<JourneyStep>;
    let redirectService: jasmine.SpyObj<DocumentRedirectService>;
    let titleService: jasmine.SpyObj<Title>;
    let currentJourneyStep: Steps;
    const clientSettings = new Config();

    const bindings = new JourneyStepComponentBindingsStub();
    const config = new Config();

    beforeEach(() => {
        redirectService = jasmine.createSpyObj<DocumentRedirectService>(['to']);
        configServiceSpy = jasmine.createSpyObj<ConfigService>('ConfigService', ['getClientSettings', 'loadConfig']);
        configServiceSpy.getClientSettings.and.returnValue(of(clientSettings));
        titleService = jasmine.createSpyObj<Title>(['setTitle']);
        routerEvents = new Subject();
        stepEvents = new EventEmitter<JourneyStep>();
        journey = {
            ...jasmine.createSpyObj<JourneyBase>(['jumpTo', 'startAt']),
            redirect: stepEvents
        } as jasmine.SpyObj<JourneyBase>;
        journey.redirect.subscribe((s: Steps) => (currentJourneyStep = s));
    });

    const givenCurrentUrlIs = (url: string) => {
        router = {
            ...jasmine.createSpyObj<Router>(['navigate']),
            events: routerEvents.asObservable(),
            url: url
        } as jasmine.SpyObj<Router>;

        location = {
            ...jasmine.createSpyObj<Location>(['path'])
        } as jasmine.SpyObj<Location>;
        location.path.and.returnValue('/checking-video-hearing');

        service = new JourneyRoutingListenerService(
            location,
            router,
            configServiceSpy,
            redirectService,
            jasmine.createSpyObj<Logger>(['event']),
            titleService
        );
    };

    const givenInitialisedAtStartStep = () => {
        givenCurrentUrlIs('/' + bindings.getRoute(bindings.initialStep));
        service.startRouting(bindings, journey);
    };

    it('should re-route to start step component if entering on application home', () => {
        givenCurrentUrlIs('/' + AppPaths.Root);
        service.startRouting(bindings, journey);
        service.startJourneyAtCurrentRoute();
        expect(journey.startAt).toHaveBeenCalledWith(bindings.initialStep);
    });

    it('should re-route to start step if routed to application home', () => {
        givenCurrentUrlIs('/login');
        service.startRouting(bindings, journey);

        const rootUrl = `/${AppPaths.Root}`;
        routerEvents.next(new ResolveEnd(0, rootUrl, rootUrl, null));

        // then we should be redirected to the initial step url
        expect(journey.startAt).toHaveBeenCalledWith(bindings.initialStep);
    });

    it('should navigate to mapped route on journey step change', () => {
        givenInitialisedAtStartStep();
        stepEvents.emit(Steps.CheckingVideoHearing);
        expect(router.navigate).toHaveBeenCalledWith([`/${Paths.CheckingVideoHearing}`]);
    });

    it('should set the title', () => {
        givenInitialisedAtStartStep();
        const url = `/${Paths.CheckingVideoHearing}`;
        routerEvents.next(new ResolveEnd(0, url, url, null));
        expect(titleService.setTitle).toHaveBeenCalledWith('Checking Video Hearing');
    });
});
