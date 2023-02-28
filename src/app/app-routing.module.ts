import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  
  {
    path: '',
    redirectTo: '/contacts/home',
    pathMatch: "full" 
   },
  {
    path:"contacts",
    loadChildren: () => 
    import("./contacts/contacts.module").then(m=> m.ContactsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
