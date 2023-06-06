import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/docker_manage', pathMatch: 'full'
  },
  {
    path: 'docker_manage',
    loadChildren: () => import('../app/docker-manage/docker-manage.module').then(m => m.DockerManageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
