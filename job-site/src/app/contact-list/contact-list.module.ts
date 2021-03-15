import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContactListComponent } from './contact-list.component';
import { ContactListRoutingModule } from './contact-list-routing.module';
import { PresentationModule } from '../presentation/presentation.module';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { AddContactModule } from '../add-contact/add-contact.module';


@NgModule({
  declarations: [ContactListComponent],
  imports: [
    CommonModule,
    ContactListRoutingModule,
    PresentationModule,
    AddContactModule
  ],
  providers: [DatePipe],
  exports: [ContactListComponent]
})
export class ContactListModule { }
