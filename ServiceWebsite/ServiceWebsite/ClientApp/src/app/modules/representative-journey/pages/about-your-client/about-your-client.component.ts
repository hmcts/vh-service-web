import { Component, OnInit } from '@angular/core';
import { RepresentativeBaseComponent } from '../representative-base-component/representative-base.component';
import { SuitabilityChoicePageBaseComponent } from 'src/app/modules/individual-journey/components/suitability-choice-page-base.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-about-your-client',
  templateUrl: './about-your-client.component.html',
  styles: []
})
export class AboutYourClientComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  readonly textInput = new FormControl('');

  ngOnInit(): void {

  }
  protected bindModel(): void {

  }
}
