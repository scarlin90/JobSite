import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddContactComponent } from './add-contact.component';



@NgModule({
  declarations: [AddContactComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AddContactComponent],
})
export class AddContactModule { }
