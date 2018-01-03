import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { ViewComponent } from './view.component';
import { ContributeComponent } from './contribute.component';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'view/:file', component: ViewComponent },
  { path: 'contribute', component: ContributeComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
