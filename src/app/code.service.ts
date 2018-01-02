import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { File } from './file';

@Injectable()
export class CodeService {
  constructor(private http: Http) { }
  listFiles() {
    return this.http.get('/assets/library/files.json').toPromise().then(resp => JSON.parse(resp.text()));
  }
  getFile(name: string): Promise<File> {
    const contents = this.http.get('/assets/library/' + name).toPromise();
    return Promise.all([contents, this.listFiles()]).then(resp => {
      let title = '';
      for (const x of resp[1]) {
        if (x.name === name) {
          title = x.title;
        }
      }
      return { title, name, contents: resp[0].text() };
    });
  }
}
