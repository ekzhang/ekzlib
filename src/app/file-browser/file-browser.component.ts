import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CodeService } from '../code.service';
import { File, FileInfo } from '../file';
import { switchMap } from 'rxjs/operators';
import { FileListComponent } from 'app/file-list/file-list.component';
import { FileViewComponent } from 'app/file-view/file-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-browser',
  templateUrl: 'file-browser.component.html',
  styleUrls: [],
  imports: [
    CommonModule,
    FileListComponent,
    FileViewComponent
  ]
})
export class FileBrowserComponent implements OnInit {
  public file: File;
  public fileList: FileInfo[];

  constructor(
    private codeService: CodeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.codeService.listFiles().then((files) => (this.fileList = files));
    this.route.params
      .pipe(
        switchMap(async (params: Params) => {
          const name = params['file'];
          if (!name) {
            return;
          }
          const title = await this.codeService.getTitle(name);
          return this.codeService.getFile({
            name,
            title,
            repo: 'ekzhang/library'
          });
        })
      )
      .subscribe((file) => {
        this.file = file;
      });
  }
  
  ngOnDestroy() {}
}
