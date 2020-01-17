import { AnswersSavedComponent } from './answers-saved.component';

//import {
//  JourneyComponentTestBed,
//  RepresentativeJourneyStubs
//} from '../component/';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { SelfTestJourneySteps } from 'src/app/modules/self-test-journey/self-test-journey-steps';
import { JourneyComponentTestBed, } from '../../modules/base-journey/components/journey-component-test-bed.spec';
import { Router } from '@angular/router';
import { JourneyBase } from '../../modules/base-journey/journey-base';
import { JourneyStep } from '../../modules/base-journey/journey-step';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

//describe('AnswersSavedComponent', () => {
//    let journey: jasmine.SpyObj<JourneyBase>;
//    let stepEvents: EventEmitter<JourneyStep>;
//  it(`goes to ${RepresentativeJourneySteps} when pressing continue`, () => {
//      journey = {
//          ...jasmine.createSpyObj<JourneyBase>(['jumpTo', 'startAt']),
//          redirect: stepEvents
//      } as jasmine.SpyObj<JourneyBase>;

//      const componentFixture = JourneyComponentTestBed.createComponent({
//      component: AnswersSavedComponent,
//      journey: journey
//    });

//    const fixture = new SuitabilityChoiceComponentFixture(componentFixture);
//    fixture.submitIsClicked();

//    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.CheckYourComputer);
//  });
//});

describe('AnswersSavedComponent', () => {
    let journey: jasmine.SpyObj<JourneyBase>;
    let stepEvents: EventEmitter<JourneyStep>;
    let component: AnswersSavedComponent;
    let fixture: ComponentFixture<AnswersSavedComponent>;

    beforeEach(() => {
        journey = {
            ...jasmine.createSpyObj<JourneyBase>(['jumpTo', 'startAt','goto']),
            redirect: stepEvents
        } as jasmine.SpyObj<JourneyBase>;
        component = new AnswersSavedComponent(journey);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
   
    it('should navigate to url that was saved in session', () => {
        component.continue();
        expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.CheckYourComputer);
       
    });
});
