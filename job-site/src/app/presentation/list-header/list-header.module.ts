import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHeaderComponent } from './list-header.component';



@NgModule({
  declarations: [ListHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ListHeaderComponent
  ]
})
export class ListHeaderModule { }
