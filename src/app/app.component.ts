import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CodeService } from './code.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private files;

  constructor(
    private codeService: CodeService
  ) { }

  ngOnInit() {
    this.codeService.listFiles().then(files => this.files = files);
  }
}
