import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../error/error.component';
import { DockerCreateComponent } from './docker-create/docker-create.component';
import { DockerEditComponent } from './docker-edit/docker-edit.component';
import { DockerHomeComponent } from './docker-home/docker-home.component';
import { DockerListingComponent } from './docker-listing/docker-listing.component';
import { NonUserCreateHomeComponent } from './non-user-create-home/non-user-create-home.component';
import { CTemplateComponent } from './non-user-create/c-template/c-template.component';
import { JavaTemplateComponent } from './non-user-create/java-template/java-template.component';
import { JsTemplateComponent } from './non-user-create/js-template/js-template.component';
import { NonUserCreateComponent } from './non-user-create/non-user-create.component';
import { PythonTemplateComponent } from './non-user-create/python-template/python-template.component';
import { NonUserUpdateComponent } from './non-user-update/non-user-update.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: DockerHomeComponent
    },
    {
        path: 'non_user_create_home', component: NonUserCreateHomeComponent
    },
    {
        path: 'create', component: DockerCreateComponent
    },
    {
        path: 'non_user_create', component: NonUserCreateComponent
    },
    {
        path: 'non_user_create/js_template', component: JsTemplateComponent
    },
    {
        path: 'non_user_create/java_template', component: JavaTemplateComponent
    },
    {
        path: 'non_user_create/c_template', component: CTemplateComponent
    },
    {
        path: 'non_user_create/python_template', component: PythonTemplateComponent
    },
    {
        path: 'non_user_update', component: NonUserUpdateComponent
    },
    {
        path: 'edit', component: DockerEditComponent
    },
    {
        path: 'listing', component: DockerListingComponent
    },
    // when user calls a page without having role asset , this component will load 
    {
        path: 'error',
        component: ErrorComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DockerManageRoutingModule { }
