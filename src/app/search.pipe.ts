import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value, keys: string, term: string) {
    if (!term) {
      return value;
    }
    const re = new RegExp(term, 'gi');
    return (value || []).filter((item) =>
      keys.split(',').some(key => item.hasOwnProperty(key) && re.test(item[key]))
    );
  }
}
