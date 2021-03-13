import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContactListComponent } from './contact-list.component';
import { ContactListRoutingModule } from './contact-list-routing.module';
import { PresentationModule } from '../presentation/presentation.module';


@NgModule({
  declarations: [ContactListComponent],
  imports: [
    CommonModule,
    ContactListRoutingModule,
    PresentationModule
  ],
  providers: [DatePipe],
  exports: [ContactListComponent]
})
export class ContactListModule { }
