import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { FileInfo } from '../file';

@Component({
  selector: 'app-file-list',
  templateUrl: 'file-list.component.html',
  styleUrls: ['./file-list.component.css']
})

export class FileListComponent implements OnInit {
  public files: FileInfo[];
  public query: string;

  constructor(private codeService: CodeService) { }

  ngOnInit() {
    this.codeService.listFiles().then(files => this.files = files);
  }
}
