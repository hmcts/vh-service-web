import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appBooleanHumanView'
})

export class AppBooleanHumanViewPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    if (value !== undefined && value !== null) {
      return value ? 'Yes' : 'No';
    }

    return '';
  }
}
