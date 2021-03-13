import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from './card/card.module';
import { ListHeaderModule } from './list-header/list-header.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    ListHeaderModule
  ],
  exports: [CardModule, ListHeaderModule]
})
export class PresentationModule { }
