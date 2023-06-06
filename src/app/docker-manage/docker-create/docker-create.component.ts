import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { DockerInstructionsConfigService } from "src/app/shared/service/docker-instructions-config-service";
import { DockerManageService } from "../service/docker-manage.service";
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-docker-create',
    templateUrl: './docker-create.component.html',
})

export class DockerCreateComponent implements OnInit {

    public osType = [
        {
            id: 0,
            key: 'W',
            name: 'Window'
        },
        {
            id: 1,
            key: 'L',
            name: 'Linux / MacOs'
        }
    ];

    public selectedType: any = null;
    public selectedProgramming: any = null;


    public programmings: any = []
    public newDockerInstructions: any = [];

    public jsInstructions: any = [];
    public javaInstructions: any = [];
    public pyInstructions: any = []
    public phpInstructions: any = [];
    public othersInstructions: any = [];
    public newUserInstructions: any = [];
    public nsInstructions: any = [];
    public oaInstructions: any = [];
    public dcInstructions: any = []; 
    public rnnInstructions: any = [];
    public cnnInstructions: any = [];
    public ffInstructions: any = [];
    public conInstructions: any = [];
    public palaInstructions: any = []; 
    public flowInstructions: any = []; 
    public bmInstructions: any = [];
    public cdetInstructions: any = [];
    public copInstructions: any = [];
    public mcrInstructions: any = []; 
    public mfcInstructions: any = [];


    public isJavaScript: boolean = false;
    public isJava: boolean = false;
    public isPHP: boolean = false;
    public isPython: boolean = false;
    public isOthers: boolean = false;

    public isNS: boolean = false;
    public isOA: boolean = false;
    public isDC: boolean = false;
    public isRNN: boolean = false;
    public isCNN: boolean = false;
    public isFF: boolean = false;
    public isCon: boolean = false;
    public isPala: boolean = false;
    public isFlow: boolean = false;
    public isBM: boolean = false;
    public isCdet: boolean = false;
    public isCOP: boolean = false;
    public isMCR: boolean = false;
    public isMFC: boolean = false;
    // public isNewDockerInstruction: boolean = false;

    public createForm: any;

    public _bevCreateDockerFile: any = null;
    public _bevUpdateDockerFile: any = null;
    public _bevDeleteDockerFile: any = null;
    public _bevGetDockerFile: any = null;

    public newUser: any = false;
    public disableButton = false;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _dockerInstructionsConfigService: DockerInstructionsConfigService,
        private _fb: FormBuilder,
        private _dockerManageService: DockerManageService,
        private messageService: MessageService
    ) {
        this.retrieveBevDockerInstructionConfig();
       
    }

    /**
   * Retrieve behaviour config
   */
    retrieveBevDockerInstructionConfig() {
        this._dockerInstructionsConfigService.getDockerInstructionsConfig().subscribe(
            res => {
                let simpleProgramming;
                if (res) {
                    this.programmings = res.programming.available;
                    this.newDockerInstructions = res.programming.docker_instructions;

                    simpleProgramming = Object.assign({}, res.programming.simple);
                    this.jsInstructions = simpleProgramming.javascript;
                    this.javaInstructions = simpleProgramming.java;
                    this.phpInstructions = simpleProgramming.php;
                    this.pyInstructions = simpleProgramming.python;
                    this.othersInstructions = simpleProgramming.others;
                    this.newUserInstructions = simpleProgramming.new_user;

                    this.nsInstructions = simpleProgramming.ns;
                    this.oaInstructions = simpleProgramming.optimize;
                    this.dcInstructions = simpleProgramming.dcgan;
                    this.rnnInstructions = simpleProgramming.rnn;
                    this.cnnInstructions = simpleProgramming.cnn;
                    this.ffInstructions = simpleProgramming.ffmpeg;
                    this.palaInstructions = simpleProgramming.palabos;
                    this.flowInstructions = simpleProgramming.flow;
                    this.bmInstructions = simpleProgramming.bm;
                    this.cdetInstructions = simpleProgramming.cdet;
                    this.copInstructions = simpleProgramming.cvop;
                    this.conInstructions = simpleProgramming.converter;
                    this.mcrInstructions = simpleProgramming.mcr;
                    this.mfcInstructions = simpleProgramming.mfc;

                    console.log('Config -> simple programming', simpleProgramming);
                }
            }
        );
    }

    ngOnInit() {
        if(this._activatedRoute.snapshot.queryParams['type']) {
            this.newUser = true;
            console.log('Value >>>', this.newUser);
        } else {
            this.newUser = false;
        }
        this.setupForm();
        this.selectedType = this.osType[1];
        console.log('Selected Type ->', this.selectedType);
        this.initSubscribe();
    }

    initSubscribe() {
        // this.retrieveBevGet();
        // this.retrieveBevGetById();
        this.retrieveBevCreate();
        // this.retrieveBevUpdate();
        // this.retrieveBevDelete();
    }

    retrieveBevCreate() {
        this._dockerManageService.bevCreateDockerFile.subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        this.disableButton = false;
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Docker File created.' });
                        console.log('create DockerFile => bev subscribing ', res);
                        const successData = res['data'];
                        console.log('Success Data -> retrieve Bev Create', successData);
                    }
                },
                error: (err) => {
                    this.disableButton = false;
                    if (err) {
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Docker file creating failed' });
                    }
                }
            }
        );
    }

    // retrieveBevUpdate() {
    //     this._dockerManageService.bevUpdateDockerFile.subscribe(
    //         {
    //             next: (res: any) => {
    //                 if (res) {
    //                     console.log('Update DockerFile => bev subscribing ', res);
    //                     const successData = res['data'];
    //                     console.log('Success Data -> retrieve Bev Update', successData);
    //                 }
    //             },
    //         }
    //     );
    // }

    retrieveBevGet() {
        this._dockerManageService.bevDockerFiles.subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        console.log('Get DockerFile => bev subscribing ', res);
                        const successData = res['data'];
                        console.log('Success Data -> retrieve Bev Get', successData);
                    }
                },
            }
        );
    }

    retrieveBevGetById() {
        this._dockerManageService.bevDockerFile.subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        console.log('Get DockerFile => bev subscribing ', res);
                        const successData = res['data'];
                        console.log('Success Data -> retrieve Bev Get', successData);
                    }
                },
            }
        );
    }

    retrieveBevDelete() {
        this._dockerManageService.bevDeleteDockerFile.subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        console.log('Delete DockerFile => bev subscribing ', res);
                        const successData = res['data'];
                        console.log('Success Data -> retrieve Bev Delete', successData);
                    }
                },
            }
        );
    }


    /**
     * setup create form to control with react form
     */
    setupForm() {
        this.createForm = this._fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            os: [''],
            programming: [''],
            // newJsDockerInstruction: [''],
            // newJavaDockerInstruction: [''],
            // newPhpDockerInstruction: [''],
            // newPyDockerInstruction: [''],
            js: this._fb.array(this.jsInstructions),
            java: this._fb.array(this.javaInstructions),
            php: this._fb.array(this.phpInstructions),
            python: this._fb.array(this.pyInstructions),
            others: this._fb.array(this.othersInstructions),
            new_user: this._fb.array(this.newUserInstructions),
            // ns: this._fb.array(this.nsInstructions),
            // oa: this._fb.array(this.oaInstructions),
            // dc: this._fb.array(this.dcInstructions),
            // rnn: this._fb.array(this.rnnInstructions),
            // cnn: this._fb.array(this.cnnInstructions),
            // ff: this._fb.array(this.ffInstructions),
            // con: this._fb.array(this.conInstructions),
            // pala: this._fb.array(this.palaInstructions),
            // flow: this._fb.array(this.flowInstructions),
            // bm: this._fb.array(this.bmInstructions),
            // cdet: this._fb.array(this.cdetInstructions),
            // cop: this._fb.array(this.copInstructions),
            // mcr: this._fb.array(this.cdetInstructions),
            // mfc: this._fb.array(this.mfcInstructions),
        });

    }


    /**
     * Show/Hide depend on programming selection
     * @param $event 
     */
    onSelectProgramming($event: any) {
        console.log('On Select Programming ->', $event);

        console.log('Programming Form Control ->', this.createForm.controls['programming'].value);
        // this.isNewDockerInstruction = true;
        this.isJava = false;
        this.isPHP = false;
        this.isJavaScript = false;
        this.isPython = false;
        if ($event == 'javascript' || $event == 1) {
            console.log('JavaScript ->', $event, 'Type ->', typeof ($event));

            this.isJavaScript = true;
            this.isPHP = false;
            this.isPython = false;
            this.isJava = false;
            this.isOthers = false;
            console.log('Javascript ->', $event);
        } else if ($event == 'java' || $event == 2) {
            this.isJava = true;
            this.isPHP = false;
            this.isJavaScript = false;
            this.isPython = false;
            this.isOthers = false;
            console.log('Java ->', $event);
        }
        else if ($event == 'php' || $event == 3) {
            this.isPHP = true;
            this.isJavaScript = false;
            this.isPython = false;
            this.isJava = false;
            this.isOthers = false;
            console.log('PHP ->', $event);
        } else if ($event == 'python' || $event == 4) {
            this.isPython = true;
            this.isPHP = false;
            this.isJavaScript = false;
            this.isJava = false;
            this.isOthers = false;
            console.log('Python ->', $event);
        } else if ($event == 'others' || $event == 5) {
            this.isOthers = true;
            this.isPython = false;
            this.isPHP = false;
            this.isJavaScript = false;
            this.isJava = false;
            console.log('Others ->', $event);
        } else {
            this.isJavaScript = true;
            this.isPHP = false;
            this.isPython = false;
            this.isJava = false;
            this.isOthers = false;
        }
    }

    /**
     * Select new instruction
     * @param $event 
     */
    onSelectJsNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.jsInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);

    }

    /**
     * Select new instruction
     * @param $event 
     */
    onSelectNsNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.nsInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

     /**
     * Select new instruction
     * @param $event 
     */
     onSelectDcNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.dcInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

     /**
     * Select new instruction
     * @param $event 
     */
     onSelectOaNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.oaInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

    /**
     * Select new instruction
     * @param $event 
     */
    onSelectRnnNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.rnnInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);

    }

    /**
     * Select new instruction
     * @param $event 
     */
    onSelectCnnNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.cnnInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

     /**
     * Select new instruction
     * @param $event 
     */
     onSelectFfNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.ffInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

     /**
     * Select new instruction
     * @param $event 
     */
     onSelectConNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.conInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

    /**
     * Select new instruction
     * @param $event 
     */
    onSelectPalaNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.palaInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);

    }

    /**
     * Select new instruction
     * @param $event 
     */
    onSelectFlowNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.flowInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

     /**
     * Select new instruction
     * @param $event 
     */
     onSelectBmNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.bmInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

     /**
     * Select new instruction
     * @param $event 
     */
     onSelectCdetNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.cdetInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

     /**
     * Select new instruction
     * @param $event 
     */
     onSelectCopNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.copInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

     /**
     * Select new instruction
     * @param $event 
     */
     onSelectMcrNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.mcrInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }

     /**
     * Select new instruction
     * @param $event 
     */
     onSelectMfcNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.mfcInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: "--"
        });
        console.log('Instructions', instructions);
    }


    /**
     * Select new instruction
     * @param $event 
     */
    onSelectJavaNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.javaInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: ""
        });
        console.log('Instructions', instructions);

    }

    /**
     * Select new instruction
     * @param $event 
     */
    onSelectPyNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.pyInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: ""
        });
        console.log('Instructions', instructions);

    }

    /**
     * Select new instruction
     * @param $event 
     */
    onSelectPHPNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.phpInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: ""
        });
        console.log('Instructions', instructions);

    }

    onSelectOthersNewInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.othersInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: ""
        });
        console.log('Other -> Instructions', instructions);

    }

    onSelectNewUserInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.newUserInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: ""
        });
        console.log('NewUser -> Instructions', instructions);
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
            key: instructionKey + '@@', // in Js, key duplicate is not allowed so add @
            value: ''
        });
        console.log('Add -> Instructions', instructions);
    }

    /**
     * Remove instruction
     * @param id
     * @param instruction 
     */
    removeInstruction(id: number, instruction: any) {
        console.log('Remove -> Id', id);
        instruction.splice(id, 1);
        console.log('Remove -> Instructions', instruction);

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

        let str = JSON.stringify({ ...obj }); // object to JSON string
        console.log('Final Data Before Format', str);
        let format = str.replace(/[{}]|@@/g, '').replace(/":"/g, ' ').replace(/","/g, '\n').replace(/"/g, ''); // replace1 => @ {} to empty and replace2 => ","" to "\n doesn't allow double quote in docker file
        console.log('Format -> Docker File', format, typeof (format));
        return format;
    }

    /**
     * Export Docker File
     */
    exportDockerFile(payload:any) {

        console.log('Export Docker File -> payload', payload);
        let instructions = [];

        if (this.isJavaScript) {
            instructions = this.jsInstructions;
        } else if (this.isJava) {
            instructions = this.javaInstructions;
        } else if (this.isPHP) {
            instructions = this.phpInstructions;
        } else if (this.isPython) {
            instructions = this.pyInstructions;
        } else if (this.isOthers) {
            instructions = this.othersInstructions;
        } else if (!this.newUser) {
            instructions = this.newUserInstructions;
        } else if (this.isNS) {
            instructions = this.nsInstructions;
        } else if (this.isOA) {
            instructions = this.oaInstructions;
        } else if (this.isDC) {
            instructions = this.dcInstructions;
        } else if (this.isRNN) {
            instructions = this.rnnInstructions;
        } else if (this.isCNN) {
            instructions = this.cnnInstructions;
        } else if (this.isFF) {
            instructions = this.ffInstructions;
        } else if (this.isCon) {
            instructions = this.conInstructions;
        } else if (this.isPala) {
            instructions = this.palaInstructions;
        } else if (this.isFlow) {
            instructions = this.flowInstructions;
        } else if (this.isBM) {
            instructions = this.bmInstructions;
        } else if (this.isCdet) {
            instructions = this.cdetInstructions;
        } else if (this.isCOP) {
            instructions = this.copInstructions;
        } else if (this.isMCR) {
            instructions = this.mcrInstructions;
        } else if (this.isMFC) {
            instructions = this.mfcInstructions;
        } 

        let payloadToText = this.formatDockerFile(instructions);

        this.downloadFile(payloadToText, payload.name);
    }

    /**
     * Format payload
     * @returns Object formatPayload
     */
    formatPayload() {
        let instructions = [];
        let formatPayload = {};

        if (this.isJavaScript) {
            instructions = this.jsInstructions;
        } else if (this.isJava) {
            instructions = this.javaInstructions;
        } else if (this.isPHP) {
            instructions = this.phpInstructions;
        } else if (this.isPython) {
            instructions = this.pyInstructions;
        } else if (this.isOthers) {
            instructions = this.othersInstructions;
        } else if (!this.newUser) {
            instructions = this.newUserInstructions;
        } else if (this.isNS) {
            instructions = this.nsInstructions;
        } else if (this.isOA) {
            instructions = this.oaInstructions;
        } else if (this.isDC) {
            instructions = this.dcInstructions;
        } else if (this.isRNN) {
            instructions = this.rnnInstructions;
        } else if (this.isCNN) {
            instructions = this.cnnInstructions;
        } else if (this.isFF) {
            instructions = this.ffInstructions;
        } else if (this.isCon) {
            instructions = this.conInstructions;
        } else if (this.isPala) {
            instructions = this.palaInstructions;
        } else if (this.isFlow) {
            instructions = this.flowInstructions;
        } else if (this.isBM) {
            instructions = this.bmInstructions;
        } else if (this.isCdet) {
            instructions = this.cdetInstructions;
        } else if (this.isCOP) {
            instructions = this.copInstructions;
        } else if (this.isMCR) {
            instructions = this.mcrInstructions;
        } else if (this.isMFC) {
            instructions = this.mfcInstructions;
        } 

        formatPayload = {
            name: this.createForm.controls['name'].value,
            description: this.createForm.controls['description'].value,
            os_type: this.createForm.controls['os'].value || 0,
            programming: this.createForm.controls['programming'].value || 0,
            instructions: instructions // reactive form control does not update for instructions
        }

        return formatPayload;
    }

    /**
     * Create Docker File
     */
    createDockerFile() {
        this.disableButton = true;

        const payload = this.formatPayload();
        console.log('Docker File ->', payload);
        console.log('Javascript instructions', this.jsInstructions);

        this._dockerManageService.createDockerFile(payload);
        this.exportDockerFile(payload);

    }

    downloadFile(payload: any, name:any) {
        console.log('Download File -> Data Payload', payload, 'Name', name);
        var file = new Blob([payload]);
        // Others
        var a = document.createElement("a"),
        url = URL.createObjectURL(file);
        a.href = url;
        let fileName = name + '.dockerfile';
        console.log('File Name ->', fileName);

        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    goToListing() {
        this._router.navigate(['docker_manage/listing']);
    }

    goToUser() {
        this._router.navigate(['docker_manage/home']);
    }
}