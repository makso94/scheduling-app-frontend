import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours && minutes) {
      return `${hours}h  ${minutes}min`;

    }

    if (hours && !minutes) {
      return `${hours}h`;
    }

    return `${minutes}min`;


  }

}
