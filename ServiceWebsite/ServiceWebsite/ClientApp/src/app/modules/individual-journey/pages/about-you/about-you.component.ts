import { Component, OnDestroy } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { IndividualJourney } from '../../individual-journey';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html',
  styles: []
})
export class AboutYouComponent extends IndividualBaseComponent implements OnDestroy {
  abilityForm: FormGroup;
  ability: FormControl;
  moreDetails: FormControl;
  abilityInputChanges: Subscription;
  moreDetailsChanges: Subscription;

  constructor(journey: IndividualJourney) {
    super(journey);

    this.ability = new FormControl(this.moreDetails.aboutYou.answer, [ Validators.required ]);
    this.ability = new FormControl(this.moreDetails.aboutYou.notes, [ Validators.required ]);
    this.moreDetails = new FormControl();

    this.abilityForm = new FormGroup({
      ability: this.ability,
      moreDetails: this.moreDetails
    });

    this.abilityInputChanges = this.ability.valueChanges.subscribe(hasAbilityIssues => {
      this.model.aboutYou.answer = hasAbilityIssues;
      if (!hasAbilityIssues) {
        this.model.aboutYou.notes = null;
      }
    });

    this.moreDetailsChanges = this.moreDetails.valueChanges.subscribe(notes => {
      this.model.aboutYou.notes = notes;
    });
  }

  ngOnDestroy() {
    this.abilityInputChanges.unsubscribe();
    this.moreDetailsChanges.unsubscribe();
  }
}
