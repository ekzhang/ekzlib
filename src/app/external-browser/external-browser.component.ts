import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CodeService } from '../code.service';
import { File } from '../file';
import { switchMap } from 'rxjs/operators';

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
    this.route.params.pipe(switchMap((params: Params) => {
      let [repo, name] = params['file'].split(',');
      repo = decodeURIComponent(repo);
      name = decodeURIComponent(name);
      const title = name.substring(name.lastIndexOf('/') + 1, name.lastIndexOf('.'));
      return this.codeService.getFile({ name, title, repo });
    }))
    .subscribe(file => {
      this.file = file;
    });
  }
}
