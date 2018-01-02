import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const files = [
  { title: 'Aho-Corasick Algorithm', fileName: 'aho_corasick.cpp' }
];

@Injectable()
export class CodeService {
  constructor(private http: Http) { }
  listFiles() {
    return Promise.resolve(files);
  }
  getFile(name: string) {
    return this.http.get('/assets/library/' + name).toPromise().then(resp => resp.text());
  }
}
