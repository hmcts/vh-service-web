import { Pipe, PipeTransform } from '@angular/core';
import { Localisation } from '../../shared/localisation';

@Pipe({
  name: 'localise'
})
export class LocalisePipe implements PipeTransform {

  constructor(private localisation: Localisation) {}

  transform(value: any, args?: any): any {
    if (args) {
      return this.localisation.get(value, args);
    }

    return this.localisation.get(value);
  }

}
