import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudiesPage } from './studies.page';

const routes: Routes = [
  {
    path: '',
    component: StudiesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudiesPageRoutingModule {}
