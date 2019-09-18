import {Injectable} from '@angular/core';
import {SessionStorage} from '../../shared/services/session-storage';
import {RepresentativeSuitabilityModel} from '../representative-suitability.model';
import {Hearing, SelfTestAnswers} from '../../base-journey/participant-suitability.model';
import {MutableRepresentativeSuitabilityModel} from '../mutable-representative-suitability.model';

@Injectable()
export class RepresentativeJourneyService {
  private readonly cache: SessionStorage<RepresentativeSuitabilityModel>;

  constructor() {
    this.cache = new SessionStorage<RepresentativeSuitabilityModel>('REPRESENTATIVEJOURNEY_MODEL');
  }

  get(): RepresentativeSuitabilityModel {
    const response = this.cache.get();

    if (response === null) {
      return null;
    }

    /*
      Need to create a new object here even though the cache will return a deserialised object,
      the problem is that this returned object from that cache looses any methods available on the class.
      In this case the "isUpcoming()" was not available
    */
    const model = new MutableRepresentativeSuitabilityModel();
    model.participantId = response.participantId;
    model.hearing = new Hearing(response.hearing.id,
      new Date(response.hearing.scheduleDateTime),
      null,
      null,
      response.hearing.questionnaireNotRequired);
    model.aboutYou = response.aboutYou;
    model.camera = response.camera;
    model.computer = response.computer;

    model.selfTest = new SelfTestAnswers(response.selfTest);

    return model;
  }

  set(model: RepresentativeSuitabilityModel): void {
    this.cache.set(model);
  }
}
