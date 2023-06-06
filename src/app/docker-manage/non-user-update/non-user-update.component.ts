import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-non-user-update',
    templateUrl: './non-user-update.component.html'
})
export class NonUserUpdateComponent implements OnInit {

    public filteredCountries: any[] = [];
    public selectedCountries: any[] = [];
    public selectedCountryAdvanced: any[] = [];
    public countries: any[] = [];
    public nonUserUpdateForm: any;
    public disableButton = false;

    constructor(
        private _fb: FormBuilder,
    ) {

    }

    setupForm() {
        this.nonUserUpdateForm = this._fb.group({
            programmings: ['', Validators.required],
            dependency_file: ['', Validators.required],
            version: ['', Validators.required],
            project_folder: [''],
            run_one: [''],
            env: [''],
            run_two: [''],
            expose: [''],
            cmd: ['']
        });

    }

    createDockerFile() {

    }

    goToListing() {

    }

    uploadDependencyFile(e: any) {
        console.log('Dependency file >>', e);
    }

    /* trigger New Problem */
    triggerNewProblem(e: any) {
        console.log('Trigger New Problem ->', e);
        let output: any = [];

        if (e.target.files) {
            let resourceFile: any;

            const sortedArray = [].slice.call(e.target.files);

            const sorted = sortedArray.sort(function (a, b) {
                let keyA = a['name'];
                let keyB = b['name'];
                // Compare the 2 keys
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            console.log('sorted  ->', sorted, typeof (sorted));
            console.log('sorted Array ->', sortedArray, typeof (sortedArray));

            resourceFile = Object.assign(sorted, sorted.length);
            console.log('Resources file ->', resourceFile, typeof (resourceFile));

            const reader = new FileReader();
            reader.onload = (e: any) => {
                let file: File = resourceFile;
                let newProblemTypeFileData = file;
                console.log('New problem file data ->', newProblemTypeFileData, typeof (newProblemTypeFileData));
            }
            reader.readAsDataURL(sorted[0]);

            output = document.getElementById("listing");

            let files = sorted;
            for (let i = 0; i < files.length; i++) {
                let item = document.createElement("li");
                item.innerHTML = files[i]['webkitRelativePath'];
                output.appendChild(item);
            }
        }
    }



    ngOnInit(): void {
        this.setupForm();
        this.countries =
            [
                {
                    "id": 1,
                    "name": "javascript",
                    "label": "JavaScript"
                },
                {
                    "id": 2,
                    "name": "java",
                    "label": "Java"
                },
                {
                    "id": 3,
                    "name": "php",
                    "label": "PHP"
                },
                {
                    "id": 4,
                    "name": "python",
                    "label": "Python"
                },
            ]
    }

    filterCountry(event: { query: any; }) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;
        console.log('Query => ', query);

        for (let i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;

        console.log('filteredCountries => ', this.filteredCountries);
    }
}