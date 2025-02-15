import { Component, OnInit } from '@angular/core';

import { CodeService } from '../code.service';
import { FileInfo } from '../file';
import { CommonModule } from '@angular/common';

import { SortPipe } from '../sort.pipe'

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: 'welcome.component.html',
  imports: [
    CommonModule,
    SortPipe
  ]
})
export class WelcomeComponent implements OnInit {
  public fileList: FileInfo[];

  constructor(private codeService: CodeService) {}

  async ngOnInit() {
    this.fileList = await this.codeService.listFiles();
  }
  
  ngOnDestroy() {}
}
