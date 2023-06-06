import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from 'primeng/api';
import { DockerManageService } from "../service/docker-manage.service";


@Component({
    selector: 'app-docker-listing',
    templateUrl: './docker-listing.component.html',
})

export class DockerListingComponent implements OnInit {

    public first = 0;
    public row = 10;
    public instructions: any;

    public cols: any = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        // { field: 'from', header: 'FROM' },
        { field: 'status', header: 'Status' },
        { field: 'action', header: 'Action' }
    ];

    constructor(
        private _router: Router,
        private _confirmationService: ConfirmationService,
        private _dockerManageService: DockerManageService,
        private messageService: MessageService
    ) { }


    /**
     * Fetch the data
     */
    fetchData() {
        this._dockerManageService.getDockerFiles();
    }

    /**
     * Initialize all the bev subject
     */
    initSubscribe() {
        this.retrieveDockerFiles();
        this.retrieveDockerImageStatus();
        this.retrieveDeleteStatus();
    }

    /**
     * Retrieve Docker Files
     */
    retrieveDockerFiles() {
        this._dockerManageService.bevDockerFiles.subscribe(
            res => {
                if (res) {
                    console.log('Docker Files ->', res);
                    this.instructions = res;
                }
            });
    }

    retrieveDockerImageStatus() {
        this._dockerManageService.bevDockerImageStatus.subscribe(
            res => {
                if(res) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Docker image upload is processing.' });
                    console.log('Image Status is already updated', res);
                    this._dockerManageService.getDockerFiles();
                }
            },

            error => {
                if(error) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: ' Docker image uploading failed.' });
                }
            }
        )
    }

    retrieveDeleteStatus() {
        this._dockerManageService.bevDeleteDockerFile.subscribe(
            res => {
                if(res) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Docker File deleted.' });
                    console.log('Docker File is deleted', res);
                    this._dockerManageService.getDockerFiles();
                }
            },
            error => {
                if(error) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Docker File deleting failed.' });
                }
            }
        )
    }


    ngOnInit() {
        this.initSubscribe();
        this.fetchData();
    }

    goToCreate() {
        this._router.navigate(['docker_manage/create']);
    }

    goToDetail(instruction:any) {
        this._router.navigate(['docker_manage/edit'], {
            queryParams: {
                id: instruction.id,
                name: instruction.name
            },
        });
    }

    delete(instructions:any, instruction:any) {
        if(instructions.length > 0) {
            instructions.forEach((item: any) => {
                instructions.splice(item.id, 1);
            });
        }
        console.log('Delete -> instruction', instructions, instruction.id);
        this._dockerManageService.deleteDockerFile(instruction.id);
    }

    confirm(event: any, instruction:any) {
        this._confirmationService.confirm({
            target: event.target,
            message: 'Are you sure that you want to run the script?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                this._dockerManageService.sendDockerImageStatus(instruction.id, instruction.name, 1);
            },
            reject: () => {
                //reject action
            }
        });
    }


    confirmOne(event: any, instruction:any) {
        this._confirmationService.confirm({
            target: event.target,
            message: 'You have already pushed the script. Do you want to update it again?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //confirm action
                this._dockerManageService.sendDockerImageStatus(instruction.id, instruction.name, 2);
            },
            reject: () => {
                //reject action
            }
        });
    }

    goToHome() {
        this._router.navigate(['docker_manage/home'])
    }

}