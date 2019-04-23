import { Pipe, PipeTransform } from '@angular/core';
import { IndividualLocalisation } from '../services/individual-localisation';

@Pipe({
  name: 'localise'
})
export class LocalisePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new IndividualLocalisation().get(value);
  }

}
