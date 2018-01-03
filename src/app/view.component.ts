import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { CodeService } from './code.service';
import { File } from './file';
import 'rxjs/add/operator/switchMap';

declare var ace: any;

@Component({
  selector: 'app-view',
  templateUrl: 'view.component.html',
  styleUrls: ['view.component.css']
})
export class ViewComponent implements OnInit {
  private _file: File;
  public file: File;

  constructor(
    private codeService: CodeService,
    private route: ActivatedRoute,
    private location: Location
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
