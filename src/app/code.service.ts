import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { File, FileInfo } from './file';

const EXTERNAL_REPOS = [
  'kth-competitive-programming/kactl',
  'indy256/codelibrary',
  'jaehyunp/stanfordacm',
  't3nsor/codebook'
];

const CPP_EXTENSIONS = ['.C', '.cc', '.cpp', '.cxx', '.c++', '.h', '.hh', '.hpp', '.hxx', '.h++'];

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

  async listExternals(): Promise<FileInfo[]> {
    const trees = await Promise.all(EXTERNAL_REPOS.map(repo => {
      const url = `https://api.github.com/repos/${repo}/git/trees/master?recursive=1`;
      return this.http.get(url).toPromise().then(resp => resp.json());
    }));
    const list: FileInfo[] = [];
    for (let i = 0; i < trees.length; i++) {
      for (const file of trees[i].tree) {
        const idx = file.path.lastIndexOf('.');
        if (idx !== -1) {
          const extension = file.path.substr(idx);
          if (CPP_EXTENSIONS.includes(extension)) {
            list.push({
              title: file.path.substring(file.path.lastIndexOf('/') + 1, idx),
              name: file.path,
              repo: EXTERNAL_REPOS[i]
            });
          }
        }
      }
    }
    return list;
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
