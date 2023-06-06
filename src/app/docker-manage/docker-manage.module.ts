import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DockerCreateComponent } from "./docker-create/docker-create.component";
import { DockerEditComponent } from "./docker-edit/docker-edit.component";
import { DockerHomeComponent } from "./docker-home/docker-home.component";
import { DockerListingComponent } from "./docker-listing/docker-listing.component";
import { DockerManageRoutingModule } from "./docker-mange-routing.module";
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService, MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NonUserCreateComponent } from "./non-user-create/non-user-create.component";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NonUserUpdateComponent } from "./non-user-update/non-user-update.component";
import { NonUserCreateHomeComponent } from "./non-user-create-home/non-user-create-home.component";

const PrimeNGModules = [
    RadioButtonModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    ConfirmPopupModule,
    ToastModule,
    AutoCompleteModule,
];

@NgModule({
    declarations: [
        DockerHomeComponent,
        DockerCreateComponent,
        DockerEditComponent,
        DockerListingComponent,
        NonUserCreateComponent,
        NonUserUpdateComponent,
        NonUserCreateHomeComponent
    ],
    imports: [
        CommonModule,
        DockerManageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNGModules
    ],
    providers: [ConfirmationService, MessageService],
})

export class DockerManageModule { }