import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponentialNumber'
})
export class ExponentialNumberPipe implements PipeTransform {

  transform(value: number): string {
    return value.toFixed(0).toString().length <= 6
      ? value.toFixed(0).toString()
      : value.toExponential(2).toString();
  }

}
