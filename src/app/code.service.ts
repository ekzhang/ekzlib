import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { File, FileInfo } from './file';

@Injectable()
export class CodeService {
  private fileList: Promise<FileInfo[]>;

  constructor(private http: Http) {
    this.fileList = this.http.get('/assets/library/files.json').toPromise().then(resp => JSON.parse(resp.text()));
  }

  listFiles(): Promise<FileInfo[]> {
    return this.fileList;
  }

  async getFile(name: string): Promise<File> {
    const files = await this.listFiles();
    let title;
    for (const info of files) {
      if (info.name === name) {
        title = info.title;
        break;
      }
    }
    if (title === undefined) {
      return null;
    }
    const request = this.http.get('/assets/library/' + name).toPromise();
    const contents = (await request).text();
    return { title, name, contents };
  }
}
