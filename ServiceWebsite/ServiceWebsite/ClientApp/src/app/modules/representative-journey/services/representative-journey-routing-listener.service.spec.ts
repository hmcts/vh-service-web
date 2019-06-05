import { RepresentativeJourneySteps, RepresentativeJourneySteps as Steps } from './../representative-journey-steps';
import { Config } from './../../shared/models/config';
import { Subject } from 'rxjs';
import { RepresentativeJourneyRoutingListenerService } from './representative-journey-routing-listener.service';
import { RepresentativeJourneyStepComponentBindings } from './representative-journey-component-bindings';
import { RepresentativeJourney } from '../representative-journey';
import { Router, Event, ResolveEnd } from '@angular/router';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';
import { Paths } from '../paths';
import { Paths as AppPaths } from '../../../paths';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';
import { Hearing } from '../../base-journey/participant-suitability.model';
import { RepresentativeStepsOrderFactory } from '../representative-steps-order.factory';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const suitabilityForUpcomingHearing = new MutableRepresentativeSuitabilityModel();
suitabilityForUpcomingHearing.hearing = new Hearing('upcoming hearing', tomorrow);

describe('JourneyRoutingListenerService', () => {
  let service: RepresentativeJourneyRoutingListenerService;
  let journey: RepresentativeJourney;
  let router: jasmine.SpyObj<Router>;
  let routerEvents: Subject<Event>;
  let redirectService: jasmine.SpyObj<DocumentRedirectService>;
  let currentJourneyStep: Steps;

  const bindings = new RepresentativeJourneyStepComponentBindings();
  const config = new Config('videourl', 'appinsightskey');
  const representativeStepsOrderFactory = new RepresentativeStepsOrderFactory();

  beforeEach(() => {
    redirectService = jasmine.createSpyObj<DocumentRedirectService>(['to']);

    routerEvents = new Subject();
    journey = new RepresentativeJourney(representativeStepsOrderFactory);
    journey.redirect.subscribe((s: Steps) => currentJourneyStep = s);
  });

  const givenCurrentUrlIs = (url: string) => {
    router = {
      ...jasmine.createSpyObj<Router>(['navigate']),
      events: routerEvents.asObservable(),
      url: url
    } as jasmine.SpyObj<Router>;

    service = new RepresentativeJourneyRoutingListenerService(
      journey,
      router,
      bindings,
      config,
      redirectService
    );
  };

  const givenInitialisedAtStartStep = () => {
    givenCurrentUrlIs('/' + bindings.getRoute(RepresentativeJourney.initialStep));
    journey.forSuitabilityAnswers([suitabilityForUpcomingHearing]);
    service.initialise();
  };

  it(`should redirect externally to video web when entering journey that has no hearings`, () => {
    givenCurrentUrlIs('/' + bindings.getRoute(RepresentativeJourney.initialStep));
    journey.forSuitabilityAnswers([]);
    service.initialise();
    expect(redirectService.to).toHaveBeenCalledWith(config.videoAppUrl);
  });

  it('should re-route to start step component if entering on application home', () => {
    givenCurrentUrlIs('/' + AppPaths.Home);
    journey.forSuitabilityAnswers([suitabilityForUpcomingHearing]);
    service.initialise();

    const startStepUrl = bindings.getRoute(RepresentativeJourney.initialStep);
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
    routerEvents.next(new ResolveEnd(0, `/${Paths.QuestionnaireCompleted}`, null, null));

    // then we should be at the consent page,
    expect(journey.step).toBe(RepresentativeJourneySteps.QuestionnaireCompleted);
  });
});
