import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { ExternalBrowserComponent } from './external-browser/external-browser.component';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'view', redirectTo: 'view/' },
  { path: 'view/:file', component: FileBrowserComponent },
  { path: 'external', redirectTo: 'external/' },
  { path: 'external/:file', component: ExternalBrowserComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
