import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-non-user-create-home',
    templateUrl: './non-user-create-home.component.html'
})
export class NonUserCreateHomeComponent implements OnInit {


    public disableButton = false;

    constructor(
        private _router:Router
    ) {

    }

    ngOnInit(): void {
        
    }

    goToC() {
        this._router.navigate(['docker_manage/non_user_create'], { queryParams: { type: 'c'} });
    }

    goToJava() {
        this._router.navigate(['docker_manage/non_user_create'], { queryParams: { type: 'java'} });
    }

    goToPython() {
        this._router.navigate(['docker_manage/non_user_create'], { queryParams: { type: 'python'} });
    }

    goToJavaScript() {
        this._router.navigate(['docker_manage/non_user_create'], { queryParams: { type: 'javascript'} });
    }

    goToOther() {
        this._router.navigate(['docker_manage/non_user_create'], { queryParams: { type: 'other'} });
    }

    
}
