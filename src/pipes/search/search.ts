import {Injectable, Pipe, PipeTransform} from '@angular/core';

/*
  Generated class for the SearchPipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'search'
})
@Injectable()
export class SearchPipe implements PipeTransform {

  public transform(value, keys: string, term: string) {

    if (!term) {
      return value;
    }

    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  }
}
