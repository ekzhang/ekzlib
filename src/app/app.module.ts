import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { CodeService } from './code.service';
import { NavComponent } from './nav/nav.component';
import { SearchPipe } from './search.pipe';
import { FileListComponent } from './file-list/file-list.component';
import { FileListStandaloneComponent } from './file-list-standalone/file-list-standalone';
import { ContributeComponent } from './contribute/contribute.component';
import { AdminComponent } from './admin/admin.component';
import { SortPipe } from './sort.pipe';
import { AceEditorDirective } from './ace-editor.directive';
import { DownloadService } from './download.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FileBrowserComponent,
    NavComponent,
    FileListComponent,
    FileListStandaloneComponent,
    ContributeComponent,
    SearchPipe,
    AdminComponent,
    SortPipe,
    AceEditorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [CodeService, DownloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
