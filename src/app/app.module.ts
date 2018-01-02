import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome.component';
import { ViewComponent } from './view.component';
import { CodeService } from './code.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [CodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
