import { Pipe, PipeTransform } from '@angular/core';

import Fuse from 'fuse.js';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(items, keys: string[], term: string) {
    if (!term || term.length < 2) {
      return items;
    }
    const options = { keys };
    const fuse = new Fuse(items, options);
    return fuse.search(term).map(({ item }) => item);
  }
}
