import { Component, OnInit } from '@angular/core';

import { CodeService } from '../code.service';
import { FileInfo } from '../file';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit {
  public fileList: FileInfo[];

  constructor(private codeService: CodeService) { }

  async ngOnInit() {
    this.fileList = await this.codeService.listFiles();
  }
}
