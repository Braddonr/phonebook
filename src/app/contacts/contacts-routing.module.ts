import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [  
  { path: 'home', component: HomepageComponent },
  { path: 'view-contact/:id', component: ViewContactComponent },

];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule
  ],
  exports: [
    RouterModule
]
})
export class ContactsRoutingModule { }
