import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AppConfigService } from "src/app/shared/service/config-service";
import { DockerInstructionsConfigService } from "src/app/shared/service/docker-instructions-config-service";
import { DockerManageService } from "../service/docker-manage.service";

@Component({
    selector: 'app-docker-edit',
    templateUrl: './docker-edit.component.html',
    // styleUrls: ['./docker-edit.component.css']
})

export class DockerEditComponent implements OnInit {

    public appId: any;
    public appName: any;
    public editForm: any;

    public updatingInstructions: any = [];
    public newDockerInstructions: any = [];

    constructor(
        private _router: Router,
        public _fb: FormBuilder,
        public _activatedRoute: ActivatedRoute,
        public _dockerManageService: DockerManageService,
        public _dockerInstructionsConfigService: DockerInstructionsConfigService,
        private messageService: MessageService
    ) {
        this.retrieveBevDockerInstructionConfig();
        this.retrieveQueryParams();
        this.retrieveBevInstructionById();
    }

    /**
   * Retrieve behaviour config
   */
     retrieveBevDockerInstructionConfig() {
        this._dockerInstructionsConfigService.getDockerInstructionsConfig().subscribe(
            res => {
                if (res) {
                    this.newDockerInstructions = res.programming.docker_instructions;
                }
            }
        )
    }

    retrieveQueryParams() {
        this.appName = this._activatedRoute.snapshot.queryParams['name'];
        this.appId = this._activatedRoute.snapshot.queryParams['id'];
        this._dockerManageService.getDockerFileById(this.appId);
        console.log('Query Params -> ID', this._activatedRoute.snapshot.queryParams['name']);
    }

    ngOnInit() {
        this.setupForm();
        this.initSubscribe();
    }

    initSubscribe() {
        this.retrieveBevDockerUpdate();
    }

    retrieveBevInstructionById() {
        this._dockerManageService.bevDockerFile.subscribe(
            res => {
                if (res) {
                    this.updatingInstructions = res;
                    console.log('Docker File Detail ->', res);
                }
            }
        );
    }

    retrieveBevDockerUpdate() {
        this._dockerManageService.bevUpdateDockerFile.subscribe(
            res => {
                if (res) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Docker File updated.' });
                    const successData = res;
                    console.log('Docker File Updating ->', successData);
                }
            },

            error => {
                if(error) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Docker File updating failed.' });
                }
            }
        );
    }

    /**
 * setup create form to control with react form
 */
    setupForm() {
        this.editForm = this._fb.group({
            name: [''],
            // description: [''],
            // os: [''],
            // programming: [''],
        });

    }

    /**
     * Add duplicate instruction
     * @param instructionKey
     * @param instructions 
     */
    addDuplicateInstruction(instructionKey: any, instructions: any) {
        console.log('Copy Docker Instruction ->', instructionKey);
        console.log('Instructions -> length', instructions.length);
        instructions.push({
            id: instructions.length + 1,
            key: instructionKey + '@@',
            value: ""
        });
        console.log('Instructions', instructions);
    }

    /**
     * Remove instruction
     * @param id
     * @param instruction 
     */
    removeInstruction(id: number, instruction: any) {
        console.log('Remove -> Id', id);
        instruction.splice(id, 1);
        console.log('Js Instructions', instruction);
    }

    /**
     * Format Docker File 
     * @param instructions 
     */
    formatDockerFile(instructions: any) {
        let obj: any = [];
        instructions.forEach((element: { key: any; value: any }) => {
            let keys = element.key;
            let values = element.value;
            for (var i = 0; i < instructions.length; i++) {
                obj[keys] = values; // modify key pair style
            }
        });

        let str = JSON.stringify({ ...obj }); // arrary to object , object to string
        let format = str.replace(/[{}]|@@/g, '').replace(/":"/g, ' ').replace(/",/g,'\n').replace(/"/g, ''); // replace1 => @ {} to empty and replace2 => ", to "/n
        console.log('Format -> Docker File', format, typeof (str));
        return format;
    }

    /**
     * Export Docker File
     */
    exportDockerFile() {
        console.log('Export -> Updating Instructions ->', this.updatingInstructions);
        let payloadToText = this.formatDockerFile(this.updatingInstructions);
        this.downloadFile(payloadToText);
    }

    /**
     * Format payload
     * @returns Object formatPayload
     */
    formatPayload() {

        let formatPayload = {
            instructions: this.updatingInstructions, // reactive form control does not update for instructions
        }

        return formatPayload;
    }

    updateDockerFile() {
        const payload = this.formatPayload();
        console.log('Updating instruction -> Docker File ->', payload);
        this._dockerManageService.updateDockerFile(this.appId, payload);
        this.exportDockerFile();
    }

    downloadFile(payload: any) {

        console.log('Data Payload', payload);
        var file = new Blob([payload]);
        // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        let fileName = this.appName + '.dockerfile';
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    /**
     * Select new instruction
     * @param $event 
     */
     onSelectNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.updatingInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: ""
        });
        console.log('Instructions', instructions);

    }

    goToListing() {
        this._router.navigate(['docker_manage/listing']);
    }
}