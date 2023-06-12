import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DockerInstructionsConfigService } from "src/app/shared/service/docker-instructions-config-service";

@Component({
    selector: 'app-c-template',
    templateUrl: './c-template.component.html',
    styleUrls: ['./c-template.component.css']
})
export class CTemplateComponent implements OnInit {

    public filteredCountries: any[] = [];
    public selectedCountries: any[] = [];
    public selectedCountryAdvanced: any[] = [];
    public countries: any[] = [];
    public templateForm: any;
    public disableButton = false;

    public fromInstructions: any;
    public maintainerInstructions: any;
    public runMainInstructions: any;
    public workdirInstructions: any;
    public copyInstructions: any;
    public runDependencyInstructions: any;
    public exposeInstructions: any;
    public cmdInstructions: any;

    public filteredfromInstructions: any;
    public filteredmaintainerInstructions: any;
    public filteredrunMainInstructions: any;
    public filteredworkdirInstructions: any;
    public filteredcopyInstructions: any;
    public filteredrunDependencyInstructions: any;
    public filteredexposeInstructions: any;
    public filteredcmdInstructions: any;

    public javaInstructions: any;

    public newDockerInstructions: any = [];

    public isOther = false;

    // because of field=name attribute, we need to set default value like that. 
    public defaultValue = {name: 'ubuntu'};
    public defaultValue1 = {name: 'lynnhtetaung@s.okayama-u.ac.jp'}
    public defaultValue2 = {name: 'apt-get install -y curl && curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs'}
    public defaultValue3 = {name: '/usr/src/app'}
    public defaultValue4 = {name: '. /usr/src/app'}
    public defaultValue5 = {name: 'npm install'}
    public defaultValue6 = {name: '4000'}
    public defaultValue7 = {name: "['npm', 'start']"}

    constructor(
        private _fb: FormBuilder,
        private _dockerInstructionsConfigService: DockerInstructionsConfigService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.retrieveBevDockerInstructionConfig();
    }


    /**
   * Retrieve behaviour config
   */
    retrieveBevDockerInstructionConfig() {
        this._dockerInstructionsConfigService.getDockerInstructionsConfig().subscribe(
            res => {
                this.isOther = false;
                if (res) {
                    this.newDockerInstructions = res.programming.docker_instructions;

                    let fromKey = Object.assign({}, res.instructions.from);

                    if(this._activatedRoute.snapshot.queryParams['type'] == "c") {
                    this.fromInstructions = fromKey.c;
                    }

                    let maintainerKey = Object.assign({}, res.instructions.maintainer);
                    this.maintainerInstructions = maintainerKey.email;

                    let runMainKey = Object.assign({}, res.instructions.run_main);
                    this.runMainInstructions = runMainKey.c;

                    let workdirKey = Object.assign({}, res.instructions.workdir);
                    this.workdirInstructions = workdirKey.c;

                    let copyKey = Object.assign({}, res.instructions.copy);
                    this.copyInstructions = copyKey.c;

                    let runDPKey = Object.assign({}, res.instructions.run_dependency);
                    this.runDependencyInstructions = runDPKey.c;

                    let exposeKey = Object.assign({}, res.instructions.expose);
                    this.exposeInstructions = exposeKey.port;

                    let cmdKey = Object.assign({}, res.instructions.cmd);
                    this.cmdInstructions = cmdKey.c;

                    
                }
            }
        );
    }

    onSelectNewUserInstruction($event: any) {
        console.log('New Docker Instruction ->', $event);
        let instructions = this.javaInstructions;
        instructions.push({
            id: instructions.length + 1,
            key: $event,
            value: ""
        });
        console.log('NewUser -> Instructions', instructions);
    }

    setupForm() {
       
        this.templateForm = this._fb.group({
            dependency_file: ['', Validators.required],
            from: [this.defaultValue, Validators.required],
            maintainer: [this.defaultValue1, Validators.required],
            run_main: [this.defaultValue2, Validators.required],
            workdir: [this.defaultValue3, Validators.required],
            copy: [this.defaultValue4, Validators.required],
            run_dependency: [this.defaultValue5, Validators.required],
            expose: [this.defaultValue6, Validators.required],
            cmd: [this.defaultValue7, Validators.required]
        });

        // Set the default value after the form group has been initialized
        // if cannot use with field attribue = name in autocomplete
        // this.templateForm.patchValue({
        //     from: 'ubuntu'
        //   });
   
    }

    createDockerFile() {

    }

    goToListing() {

    }

    uploadDependencyFile(e: any) {
        console.log('Dependency file >>', e);
    }


    ngOnInit(): void {

        this.setupForm();
    }

    filterFROM(event: { query: any; }) {
        let filtered: any[] = [];
        let query = event.query;
        console.log('Query => ', query);

        for (let i = 0; i < this.fromInstructions.length; i++) {
            let country = this.fromInstructions[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredfromInstructions = filtered;

        console.log('filteredfromInstructions => ', this.filteredfromInstructions);
    }

    filterMAINTAINER(event: { query: any; }) {
        let filtered: any[] = [];
        let query = event.query;
        console.log('Query => ', query);

        for (let i = 0; i < this.maintainerInstructions.length; i++) {
            let country = this.maintainerInstructions[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredmaintainerInstructions = filtered;

        console.log('filteredmaintainerInstructions => ', this.filteredmaintainerInstructions);
    }

    filterRUNMAIN(event: { query: any; }) {
        let filtered: any[] = [];
        let query = event.query;
        console.log('Query => ', query);

        for (let i = 0; i < this.runMainInstructions.length; i++) {
            let country = this.runMainInstructions[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredrunMainInstructions = filtered;

        console.log('filteredrunMainInstructions => ', this.filteredrunMainInstructions);
    }

    filterWORKDIR(event: { query: any; }) {
        let filtered: any[] = [];
        let query = event.query;
        console.log('Query => ', query);

        for (let i = 0; i < this.workdirInstructions.length; i++) {
            let country = this.workdirInstructions[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredworkdirInstructions = filtered;

        console.log('filteredworkdirInstructions => ', this.filteredworkdirInstructions);
    }

    filterCOPY(event: { query: any; }) {
        let filtered: any[] = [];
        let query = event.query;
        console.log('Query => ', query);

        for (let i = 0; i < this.copyInstructions.length; i++) {
            let country = this.copyInstructions[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredcopyInstructions = filtered;

        console.log('filteredcopyInstructions => ', this.filteredcopyInstructions);
    }

    filterRUNDEPENDENCY(event: { query: any; }) {
        let filtered: any[] = [];
        let query = event.query;
        console.log('Query => ', query);

        for (let i = 0; i < this.runDependencyInstructions.length; i++) {
            let country = this.runDependencyInstructions[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredrunDependencyInstructions = filtered;

        console.log('filteredrunDependencyInstructions => ', this.filteredrunDependencyInstructions);
    }

    filterEXPOSE(event: { query: any; }) {
        let filtered: any[] = [];
        let query = event.query;
        console.log('Query => ', query);

        for (let i = 0; i < this.exposeInstructions.length; i++) {
            let country = this.exposeInstructions[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredexposeInstructions = filtered;

        console.log('filteredexposeInstructions => ', this.filteredexposeInstructions);
    }

    filterCMD(event: { query: any; }) {
        let filtered: any[] = [];
        let query = event.query;
        console.log('Query => ', query);

        for (let i = 0; i < this.cmdInstructions.length; i++) {
            let country = this.cmdInstructions[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredcmdInstructions = filtered;

        console.log('filteredcmdInstructions => ', this.filteredcmdInstructions);
    }
}