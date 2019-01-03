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
    const filesUrl = 'https://raw.githubusercontent.com/ekzhang/library/master/files.json';
    this.fileList = this.http.get(filesUrl).toPromise().then(resp => {
      const list = JSON.parse(resp.text());
      for (const info of list) {
        info.repo = 'ekzhang/library';
      }
      return list;
    });
  }

  listFiles(): Promise<FileInfo[]> {
    return this.fileList;
  }

  async getTitle(name: string): Promise<string> {
    for (const info of await this.fileList) {
      if (info.name === name) {
        return info.title;
      }
    }
  }

  async getFile(file: FileInfo): Promise<File> {
    const url = `https://raw.githubusercontent.com/${file.repo}/master/${file.name}`;
    const response = await this.http.get(url).toPromise();
    return {
      title: file.title,
      name: file.name,
      repo: file.repo,
      contents: await response.text()
    };
  }
}
