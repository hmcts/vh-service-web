import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'appLongDate'
})

export class LongDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {

    if (value !== undefined && value !== null) {
      const result = moment(value).local().format('dddd DD MMMM YYYY');
      if (result === 'Invalid date') {
        throw new Error(`Invalid datetime was passed : '${value}'`);
      }
      return result;
    }
    return '';
  }
}
