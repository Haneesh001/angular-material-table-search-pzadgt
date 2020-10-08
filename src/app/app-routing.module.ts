import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MenuDetailsComponent} from './menu-details/menu-details.component';
// import{  AppComponent} from './app.component'
import { from } from 'rxjs';
import { OrganisationComponent } from './Organisation/organisation';
 
const routes: Routes = [
    {

    path: '', component: MenuDetailsComponent},


  { path: 'org-details', component: OrganisationComponent }


];
 

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }