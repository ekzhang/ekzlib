import { Pipe, PipeTransform } from '@angular/core';

declare const Fuse: any;

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(items, keys: string[], term: string) {
    if (!term) {
      return items;
    }
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys
    };
    const fuse = new Fuse(items, options);
    return fuse.search(term);
  }
}
