import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  declarations: [
    HomepageComponent,
    ViewContactComponent,
    
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzListModule,
    NzMessageModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzCardModule,
    NzRadioModule,
    NzGridModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzPageHeaderModule,
    NzIconModule,
    Ng2SearchPipeModule,
    NzCheckboxModule,
    NzSpinModule
  ]
})
export class ContactsModule { }
