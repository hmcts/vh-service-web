import { IndividualJourneySteps, IndividualJourneySteps as Steps } from './../individual-journey-steps';
import { Config } from './../../shared/models/config';
import { Subject } from 'rxjs';
import { JourneyRoutingListenerService } from './journey-routing-listener.service';
import { JourneyStepComponentBindings } from './journey-component-bindings';
import { IndividualJourney } from '../individual-journey';
import { Router, Event, ResolveEnd } from '@angular/router';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { Paths } from '../paths';
import { Paths as AppPaths } from '../../../paths';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';
import { Hearing } from '../../base-journey/participant-suitability.model';
import { DeviceType } from '../services/device-type';
import { IndividualStepsOrderFactory } from '../individual-steps-order.factory';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const suitabilityForUpcomingHearing = new MutableIndividualSuitabilityModel();
suitabilityForUpcomingHearing.hearing = new Hearing('upcoming hearing', tomorrow);

describe('JourneyRoutingListenerService', () => {
  let service: JourneyRoutingListenerService;
  let journey: IndividualJourney;
  let router: jasmine.SpyObj<Router>;
  let routerEvents: Subject<Event>;
  let redirectService: jasmine.SpyObj<DocumentRedirectService>;
  let currentJourneyStep: Steps;

  const bindings = new JourneyStepComponentBindings();
  const config = new Config('videourl', 'appinsightskey');
  const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
  const individualStepsOrderFactory = new IndividualStepsOrderFactory(deviceType);

  beforeEach(() => {
    redirectService = jasmine.createSpyObj<DocumentRedirectService>(['to']);

    routerEvents = new Subject();
    journey = new IndividualJourney(individualStepsOrderFactory);
    journey.redirect.subscribe((s: Steps) => currentJourneyStep = s);
  });

  const givenCurrentUrlIs = (url: string) => {
    router = {
      ...jasmine.createSpyObj<Router>(['navigate']),
      events: routerEvents.asObservable(),
      url: url
    } as jasmine.SpyObj<Router>;

    service = new JourneyRoutingListenerService(
      journey,
      router,
      bindings,
      config,
      redirectService
    );
  };

  const givenInitialisedAtStartStep = () => {
    givenCurrentUrlIs('/' + bindings.getRoute(IndividualJourney.initialStep));
    journey.forSuitabilityAnswers([suitabilityForUpcomingHearing]);
    service.initialise();
  };

  it(`should redirect externally to video web when entering journey that has no hearings`, () => {
    givenCurrentUrlIs('/' + bindings.getRoute(IndividualJourney.initialStep));
    journey.forSuitabilityAnswers([]);
    service.initialise();
    expect(redirectService.to).toHaveBeenCalledWith(config.videoAppUrl);
  });

  it('should re-route to start step component if entering on application home', () => {
    givenCurrentUrlIs('/' + AppPaths.Root);
    journey.forSuitabilityAnswers([suitabilityForUpcomingHearing]);
    service.initialise();

    const startStepUrl = bindings.getRoute(IndividualJourney.initialStep);
    expect(router.navigate).toHaveBeenCalledWith([`/${startStepUrl}`]);
  });


  it('should re-route to start step if routed to application home', () => {
    givenCurrentUrlIs('/login');
    journey.forSuitabilityAnswers([suitabilityForUpcomingHearing]);
    service.initialise();

    const rootUrl = `/${AppPaths.Root}`;
    routerEvents.next(new ResolveEnd(0, rootUrl, rootUrl, null));

    // then we should be redirected to the initial step url
    const startStepUrl = bindings.getRoute(IndividualJourney.initialStep);
    expect(router.navigate).toHaveBeenCalledWith([`/${startStepUrl}`]);
  });


  it('should navigate to mapped route on journey step change', () => {
    givenInitialisedAtStartStep();
    journey.next();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should jump to step when navigated', () => {
    givenInitialisedAtStartStep();

    // when we navigate to the consent page through other means than the journey, i.e. back button
    const consentUrl = `/${Paths.Consent}`;
    routerEvents.next(new ResolveEnd(0, consentUrl, consentUrl, null));

    // then we should be at the consent page,
    expect(journey.step).toBe(IndividualJourneySteps.Consent);
  });
});
