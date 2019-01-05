import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { MainComponent as SirjanComponent } from './sirjan/main.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'sirjan', component: SirjanComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
