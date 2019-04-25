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

    //
    // The following is an example usage of the model.
    // Any values updated/stored will be handled on .continue() or .fail() by the journey object
    //

    this.ability = new FormControl(this.model.aboutYou.answer, [ Validators.required ]);
    this.moreDetails = new FormControl(this.model.aboutYou.notes, [ Validators.required ]);

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
