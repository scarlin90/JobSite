import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list.component';
import { JobListRoutingModule } from './job-list-routing.module';
import { PresentationModule } from '../presentation/presentation.module';

@NgModule({
  declarations: [JobListComponent],
  imports: [CommonModule, JobListRoutingModule, PresentationModule],
  exports: [JobListComponent],
})
export class JobListModule {}
