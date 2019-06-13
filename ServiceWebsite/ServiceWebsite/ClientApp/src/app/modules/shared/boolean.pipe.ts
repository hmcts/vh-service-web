import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appYesNo'
})

export class AppYesNoPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    if (value !== undefined && value !== null) {
      return value ? 'Yes' : 'No';
    }

    throw new Error(`Unexpected bool value: ${value}`);
  }
}
