import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CodeService } from '../code.service';
import { File, FileInfo } from '../file';
import { switchMap } from 'rxjs/operators';
import { FileListComponent } from 'app/file-list/file-list.component';
import { FileViewComponent } from 'app/file-view/file-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-external-browser',
  templateUrl: 'external-browser.component.html',
  styleUrls: [],
  imports: [
    CommonModule,
    FileListComponent,
    FileViewComponent
  ]
})
export class ExternalBrowserComponent implements OnInit {
  public file: File;
  public fileList: FileInfo[];

  constructor(
    private codeService: CodeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.codeService.listExternals().then((files) => (this.fileList = files));
    this.route.params
      .pipe(
        switchMap(async (params: Params) => {
          if (!params['file']) {
            return;
          }
          let [repo, name] = params['file'].split(',');
          repo = decodeURIComponent(repo);
          name = decodeURIComponent(name);
          const title = name.substring(
            name.lastIndexOf('/') + 1,
            name.lastIndexOf('.')
          );
          return this.codeService.getFile({ name, title, repo });
        })
      )
      .subscribe((file) => {
        this.file = file;
      });
  }

  ngOnDestroy() {}
}
