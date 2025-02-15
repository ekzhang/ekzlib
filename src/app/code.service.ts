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
    // We can use allSettled here if we had es2020 and these types are already implemented inside.
    type FulfilledResult<T> = { status: "fulfilled"; value: T };
    type RejectedResult = { status: "rejected"; reason: any };
    type SettledResult<T> = FulfilledResult<T> | RejectedResult;

    // Create all of the requests to all of the external repositories
    const requests = EXTERNAL_REPOS.map(([repo, ref]): Promise<SettledResult<any>> => {
      const url = `https://api.github.com/repos/${repo}/git/trees/${ref}?recursive=1`;
      
      return this.http.get<any>(url, { observe: "response" }).toPromise()
      .then(response => {
        if (response.status === 200) {
          return { status: "fulfilled", value: response.body } as FulfilledResult<any>;
        } else {
            // We'll consider an error anything other than OK 200
            throw new Error(`Request failed with status ${response.status}`);
          }
        })
        .catch(error => ({ status: "rejected", reason: error }) as RejectedResult);
    });
    
    // Get the trees
    const responses: SettledResult<any>[] = await Promise.all(requests);
    const trees = responses
      .filter((response): response is FulfilledResult<any> => response.status === "fulfilled")
      .map(response => response.value);
    
    // Check if there are any errors and report them to the console
    const errors = responses
      .filter((response): response is RejectedResult => response.status === "rejected")
      .map(response => response.reason);
    if (errors.length > 0) {
      console.log("🔴 Errors when trying to fetch external repositories.");
      console.log(errors);
    }

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

  ngOnDestroy() {}
}
