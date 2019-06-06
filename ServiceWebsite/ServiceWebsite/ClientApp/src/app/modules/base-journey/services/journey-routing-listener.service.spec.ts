import {ParticipantJourneySteps as Steps} from '../participant-journey-steps';
import { Config } from '../../shared/models/config';
import { Subject } from 'rxjs';
import { JourneyRoutingListenerService } from './journey-routing-listener.service';
import { Router, Event, ResolveEnd } from '@angular/router';
import { Paths as AppPaths } from '../../../paths';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';
import { JourneyBase } from '../journey-base';
import { JourneyStep } from '../journey-step';
import { ParticipantJourneyStepComponentBindings } from './participant-journey-component-bindings';
import { EventEmitter } from '@angular/core';

class JournetStepComponentBindingsStub extends ParticipantJourneyStepComponentBindings {
  readonly initialStep = Steps.AboutYou;
  readonly bindings = new Map<JourneyStep, string>();
  constructor() {
    super();
    this.bindings.set(Steps.AboutYou, Paths.AboutYou);
    this.bindings.set(Steps.AboutHearings, Paths.AboutHearings);
  }
}

export const Paths = {
  AboutYou: 'about-you',
  AboutHearings: 'about-hearings'

};
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

describe('JourneyRoutingListenerService', () => {
  let service: JourneyRoutingListenerService;
  let journey: jasmine.SpyObj<JourneyBase>;
  let router: jasmine.SpyObj<Router>;
  let routerEvents: Subject<Event>;
  let stepEvents: EventEmitter<JourneyStep>;
  let redirectService: jasmine.SpyObj<DocumentRedirectService>;
  let currentJourneyStep: Steps;

  const bindings = new JournetStepComponentBindingsStub();
  const config = new Config('videourl', 'appinsightskey');

  beforeEach(() => {
    redirectService = jasmine.createSpyObj<DocumentRedirectService>(['to']);

    routerEvents = new Subject();
    stepEvents = new EventEmitter<JourneyStep>();
    journey = {
      ...jasmine.createSpyObj<JourneyBase>(['jumpTo', 'startAt']),
      redirect: stepEvents
    } as jasmine.SpyObj<JourneyBase>;

    journey.redirect.subscribe((s: Steps) => currentJourneyStep = s);
  });

  const givenCurrentUrlIs = (url: string) => {
    router = {
      ...jasmine.createSpyObj<Router>(['navigate']),
      events: routerEvents.asObservable(),
      url: url
    } as jasmine.SpyObj<Router>;
    console.log(router);
    service = new JourneyRoutingListenerService(
      router,
      config,
      redirectService
    );
  };

  const givenInitialisedAtStartStep = () => {
    givenCurrentUrlIs('/' + bindings.getRoute(bindings.initialStep));
    service.initialise(bindings, journey);
  };

  it('should re-route to start step component if entering on application home', () => {
    givenCurrentUrlIs('/' + AppPaths.Home);
    service.initialise(bindings, journey);
    const startStepUrl = bindings.getRoute(bindings.initialStep);
    expect(journey.startAt).toHaveBeenCalledWith(bindings.initialStep);
  });

  it('should navigate to mapped route on journey step change', () => {
    givenInitialisedAtStartStep();
    stepEvents.emit(Steps.AboutHearings);
    expect(router.navigate).toHaveBeenCalledWith([`/${Paths.AboutHearings}`]);
  });

  it('should jump to step when navigated', () => {
    givenInitialisedAtStartStep();

    // when we navigate to the consent page through other means than the journey, i.e. back button
    routerEvents.next(new ResolveEnd(0, `/${Paths.AboutYou}`, null, null));
    // then we should be at the consent page,
    expect(journey.jumpTo).toHaveBeenCalledWith(Steps.AboutYou);
  });
});
