import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { FileInfo } from '../file';

@Component({
  selector: 'app-external-list',
  templateUrl: 'external-list.component.html',
  styleUrls: ['./external-list.component.css']
})

export class ExternalListComponent implements OnInit {
  public files: FileInfo[];
  public query: string;

  constructor(private codeService: CodeService) { }

  ngOnInit() {
    this.codeService.listExternals().then(files => this.files = files);
  }

  escape(str) {
    return encodeURIComponent(str);
  }
}
