import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from './api';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { CardListService } from './common-services/card-list.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [DatePipe, CardListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
