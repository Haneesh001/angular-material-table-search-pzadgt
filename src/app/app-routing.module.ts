import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


// import{  AppComponent} from './app.component'
import { from } from 'rxjs';
import { OrganisationComponent } from './Organisation/organisation';
 
const routes: Routes = [
   


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
// export const routingComponent =[MenuDetailsComponent, OrganisationComponent]