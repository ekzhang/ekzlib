import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { CodeService } from './code.service';
import 'rxjs/add/operator/switchMap';

declare var hljs: any;

@Component({
  selector: 'app-view',
  templateUrl: 'view.component.html'
})

export class ViewComponent implements OnInit {
  private fileName: string;
  private fileContents: string;
  @ViewChild('code')
  private codeElement: ElementRef;

  constructor(
    private codeService: CodeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.fileName = params.get('file');
        return this.codeService.getFile(this.fileName);
      })
      .subscribe(file => {
        this.fileContents = file;
        this.codeElement.nativeElement.textContent = file;
        hljs.highlightBlock(this.codeElement.nativeElement);
      });
  }
}
