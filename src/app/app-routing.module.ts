import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { ViewComponent } from './view/view.component';
import { ContributeComponent } from './contribute/contribute.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'view/:file', component: ViewComponent },
  { path: 'contribute', component: ContributeComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
