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
  public file: File;
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
        const name = params.get('file');
        return this.codeService.getFile(name);
      })
      .subscribe(file => {
        this.file = file;
        this.reset();
      });
  }

  reset() {
    this.editor.setValue(this.file.contents);
    this.editor.gotoLine(0);
    this.editor.scrollToLine(0, false, true);
  }
}
