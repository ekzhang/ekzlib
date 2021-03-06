import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
  faCode,
  faSync,
  faDownload,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { CodeService } from './code.service';
import { NavComponent } from './nav/nav.component';
import { SearchPipe } from './search.pipe';
import { FileListComponent } from './file-list/file-list.component';
import { SortPipe } from './sort.pipe';
import { AceEditorDirective } from './ace-editor.directive';
import { DownloadService } from './download.service';
import { ExternalBrowserComponent } from './external-browser/external-browser.component';
import { FileViewComponent } from './file-view/file-view.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FileBrowserComponent,
    NavComponent,
    FileListComponent,
    SearchPipe,
    SortPipe,
    AceEditorDirective,
    ExternalBrowserComponent,
    FileViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [CodeService, DownloadService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCode, faSync, faDownload, faTrashAlt, faGithub);
  }
}
