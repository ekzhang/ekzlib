import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CodeService } from './code.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public files;
  public query;

  constructor(private codeService: CodeService) { }

  ngOnInit() {
    this.codeService.listFiles().then(files => this.files = files);
  }
}
