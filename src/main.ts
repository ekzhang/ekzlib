import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from './environments/environment';
import { AppComponent } from './app/app/app.component';
import { AppRoutingModule, routes } from './app/app-routing.module';
import { CodeService } from './app/code.service';
import { DownloadService } from './app/download.service';
import { provideRouter } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

// Bootstrap the application without using AppModule
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(FormsModule, NgbModule, FontAwesomeModule, AppRoutingModule),
    CodeService,
    DownloadService
  ]
}).catch(error => console.log(error));
