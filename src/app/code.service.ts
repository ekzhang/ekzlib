import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { File, FileInfo } from './file';

const EXTERNAL_REPOS = [
  ['kth-competitive-programming/kactl', 'main'],
  ['indy256/codelibrary', 'main'],
  ['jaehyunp/stanfordacm', 'master'],
  ['t3nsor/codebook', 'master'],
  ['spaghetti-source/algorithm', 'master']
];

const CPP_EXTENSIONS = [
  '.C',
  '.cc',
  '.cpp',
  '.cxx',
  '.c++',
  '.h',
  '.hh',
  '.hpp',
  '.hxx',
  '.h++'
];

@Injectable()
export class CodeService {
  private fileList: Promise<FileInfo[]>;

  constructor(private http: HttpClient) {
    const filesUrl =
      'https://raw.githubusercontent.com/ekzhang/library/master/files.json';
    this.fileList = this.http
      .get<Array<FileInfo>>(filesUrl)
      .toPromise()
      .then((list) => {
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
    const trees = await Promise.all(
      EXTERNAL_REPOS.map(([repo, ref]) => {
        const url = `https://api.github.com/repos/${repo}/git/trees/${ref}?recursive=1`;
        return this.http.get<any>(url).toPromise();
      })
    );
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
              repo: EXTERNAL_REPOS[i][0]
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
    const response = await this.http
      .get(url, { responseType: 'text' })
      .toPromise();
    return {
      title: file.title,
      name: file.name,
      repo: file.repo,
      contents: response
    };
  }
}
