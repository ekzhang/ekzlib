import { Component, Input } from '@angular/core';
import { FileInfo } from '../file';
import { FormsModule } from '@angular/forms';

import { SortPipe } from '../sort.pipe'
import { SearchPipe } from '../search.pipe'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-file-list',
  templateUrl: 'file-list.component.html',
  styleUrls: ['./file-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    SortPipe,
    SearchPipe,
    RouterModule
  ]
})
export class FileListComponent {
  @Input()
  public files: FileInfo[];

  @Input()
  public external = false;

  public query: string;

  public escape = encodeURIComponent;

  ngOnDestroy() {}
}
