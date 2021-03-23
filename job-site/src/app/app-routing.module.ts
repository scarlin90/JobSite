import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'contacts',
    loadChildren: () =>
      import('./contact-list/contact-list.module').then(
        (m) => m.ContactListModule
      ),
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./job-list/job-list.module').then((m) => m.JobListModule),
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
