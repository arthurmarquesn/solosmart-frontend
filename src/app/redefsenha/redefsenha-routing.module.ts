import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedefsenhaPage } from './redefsenha.page';

const routes: Routes = [
  {
    path: '',
    component: RedefsenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedefsenhaPageRoutingModule {}
