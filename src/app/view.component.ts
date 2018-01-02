import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { CodeService } from './code.service';
import 'rxjs/add/operator/switchMap';

declare var ace: any;

@Component({
  selector: 'app-view',
  templateUrl: 'view.component.html',
  styleUrls: ['view.component.css']
})
export class ViewComponent implements OnInit {
  public fileName: string;
  private fileContents: string;
  private editor;

  constructor(
    private codeService: CodeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.$blockScrolling = Infinity;
    this.editor.setTheme('ace/theme/textmate');
    this.editor.getSession().setMode('ace/mode/c_cpp');
    this.editor.setShowPrintMargin(false);
    // this.editor.setReadOnly(true);

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.fileName = params.get('file');
        return this.codeService.getFile(this.fileName);
      })
      .subscribe(file => {
        this.fileContents = file;
        this.reset();
      });
  }

  reset() {
    console.log(this.fileContents);
    this.editor.setValue(this.fileContents);
    this.editor.gotoLine(0);
    this.editor.scrollToLine(0, false, true);
  }
}
