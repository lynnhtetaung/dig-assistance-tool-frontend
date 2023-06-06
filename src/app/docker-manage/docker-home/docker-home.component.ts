import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";

@Component({
    selector: 'app-docker-home',
    templateUrl: './docker-home.component.html',
    // styleUrls: ['./docker-home.component.css']
})

export class DockerHomeComponent implements OnInit {

    public projects = [
        {
            key: 'Y',
            name: 'Non-Docker Knowledge'
        },
        {
            key: 'N',
            name: 'Docker Knowledge'
        }
    ];

    public selectedType: any = null;

    constructor(
        private _router: Router,
        private _confirmationService: ConfirmationService,
    ) {

    }

    ngOnInit() {
        this.selectedType = this.projects[1];
        console.log('Selected Type ->', this.selectedType);
    }

    onSelectType($event: any) {
        console.log('On Select Change ->', $event);
        if($event.key == 'Y') {
            this._router.navigate(['docker_manage/create']);
        } else {
            this._router.navigate(['docker_manage/new_create'], { queryParams: { type: 'new_user'} });
        }
    }

    goToUser() {
        this._router.navigate(['docker_manage/create']);
    }

    goToNoUser() {
        this._router.navigate(['docker_manage/new_create'], { queryParams: { type: 'new_user'} });
    }

    goToListing() {
        this._router.navigate(['docker_manage/listing']);
    }

    confirmOne(event: any) {
        this._confirmationService.confirm({
            target: event.target,
            message: 'Do you have existing docker file ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                this._router.navigate(['docker_manage/non_user_update'], { queryParams: { type: 'update'} });
            },
            reject: () => {
                this._router.navigate(['docker_manage/non_user_create_home']);
            }
        });
    }
}