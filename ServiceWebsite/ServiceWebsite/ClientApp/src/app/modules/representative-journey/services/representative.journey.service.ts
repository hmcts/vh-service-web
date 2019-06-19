import { Injectable } from '@angular/core';
import { SessionStorage } from '../../shared/services/session-storage';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';
import {Hearing} from '../../base-journey/participant-suitability.model';
import {MutableRepresentativeSuitabilityModel} from '../mutable-representative-suitability.model';

@Injectable()
export class RepresentativeJourneyService {
  private readonly cache: SessionStorage<RepresentativeSuitabilityModel>;

  constructor() {
    this.cache = new SessionStorage<RepresentativeSuitabilityModel>('REPRESENTATIVEJOURNEY_MODEL');
  }

  get(): RepresentativeSuitabilityModel {
    const response = this.cache.get();

    if (response === null) { return null; }

    const model = new MutableRepresentativeSuitabilityModel();
    model.hearing = new Hearing(response.hearing.id, new Date(response.hearing.scheduleDateTime));
    model.aboutYou = response.aboutYou;
    model.aboutYourClient = response.aboutYourClient;
    model.clientAttendance = response.clientAttendance;
    model.hearingSuitability = response.hearingSuitability;
    model.room = response.room;
    model.camera = response.camera;
    model.computer = response.computer;

    return model;
  }

  set(model: RepresentativeSuitabilityModel): void {
    this.cache.set(model);
  }
}
