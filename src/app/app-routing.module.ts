import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { ContributeComponent } from './contribute/contribute.component';
import { AdminComponent } from './admin/admin.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileListStandaloneComponent } from './file-list-standalone/file-list-standalone.component';
import { ExternalListStandaloneComponent } from './external-list-standalone/external-list-standalone.component';
import { ExternalBrowserComponent } from './external-browser/external-browser.component';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'view', component: FileListStandaloneComponent },
  { path: 'view/:file', component: FileBrowserComponent },
  { path: 'external', component: ExternalListStandaloneComponent },
  { path: 'external/:file', component: ExternalBrowserComponent },
  { path: 'contribute', component: ContributeComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
