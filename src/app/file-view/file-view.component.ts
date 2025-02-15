import { Component, Input } from '@angular/core';
import { File } from '../file';
import { DownloadService } from '../download.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css'],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class FileViewComponent {
  private _file: File;

  @Input() set file(value: File) {
    this._file = value;
    this.reset();
  }

  get file(): File {
    return this._file;
  }

  public workingFile: File;

  constructor(public downloadService: DownloadService) {}

  reset() {
    if (this.file !== null) {
      this.workingFile = Object.assign({}, this.file);
    } else {
      (this.workingFile as any) = null;
    }
  }
  
  ngOnDestroy() {}
}
