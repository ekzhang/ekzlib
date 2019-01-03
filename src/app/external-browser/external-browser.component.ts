import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CodeService } from '../code.service';
import { File } from '../file';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-external-browser',
  templateUrl: 'external-browser.component.html',
  styleUrls: []
})
export class ExternalBrowserComponent implements OnInit {
  public file: File;

  constructor(
    private codeService: CodeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap(async (params: ParamMap) => {
        let [ repo, name ] = params.get('file').split(',');
        repo = decodeURIComponent(repo);
        name = decodeURIComponent(name);
        const title = name.substring(name.lastIndexOf('/') + 1, name.lastIndexOf('.'));
        return this.codeService.getFile({ name, title, repo });
      })
      .subscribe(file => {
        this.file = file;
      });
  }
}
