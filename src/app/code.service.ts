import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CodeService {
  constructor(private http: Http) { }
  listFiles() {
    return this.http.get('/assets/library/files.json').toPromise().then(resp => JSON.parse(resp.text()));
  }
  getFile(name: string) {
    return this.http.get('/assets/library/' + name).toPromise().then(resp => resp.text());
  }
}
