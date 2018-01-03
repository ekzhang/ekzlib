import { Injectable } from '@angular/core';
import { File } from './file';

@Injectable()
export class DownloadService {

  constructor() { }

  download(file: File) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(file.contents));
    element.setAttribute('download', file.name);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
