import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome.component';
import { ViewComponent } from './view.component';
import { CodeService } from './code.service';
import { NavComponent } from './nav.component';
import { SearchPipe } from './search.pipe';
import { FileListComponent } from './file-list.component';
import { ContributeComponent } from './contribute.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ViewComponent,
    NavComponent,
    FileListComponent,
    ContributeComponent,
    SearchPipe,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [CodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
