import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';


import { AccountBookFill, AlertFill, AlertOutline, BackwardFill, BackwardOutline, PlusOutline} from '@ant-design/icons-angular/icons';
import { ContactService } from './shared/services/contact.service';


const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill, BackwardFill, BackwardOutline, PlusOutline];

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzListModule,
    NzMessageModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzIconModule.forRoot(icons),
    BrowserAnimationsModule 
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
