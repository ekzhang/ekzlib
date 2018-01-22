import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { CodeService } from '../code.service';
import { DownloadService } from '../download.service';
import { File } from '../file';
import 'rxjs/add/operator/switchMap';

declare var ace: any;

@Component({
  selector: 'app-file-browser',
  templateUrl: 'file-browser.component.html',
  styleUrls: ['file-browser.component.css']
})
export class FileBrowserComponent implements OnInit {
  private _file: File;
  public file: File;

  constructor(
    private codeService: CodeService,
    private route: ActivatedRoute,
    private location: Location,
    public downloadService: DownloadService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const name = params.get('file');
        return this.codeService.getFile(name);
      })
      .subscribe(file => {
        this._file = file;
        this.reset();
      });
  }

  reset() {
    this.file = Object.assign({}, this._file);
  }
}
