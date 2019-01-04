import { Component, Input } from '@angular/core';
import { FileInfo } from '../file';

@Component({
  selector: 'app-file-list',
  templateUrl: 'file-list.component.html',
  styleUrls: ['./file-list.component.css']
})

export class FileListComponent {
  @Input()
  public files: FileInfo[];

  @Input()
  public external = false;

  public query: string;

  public escape = encodeURIComponent;
}
