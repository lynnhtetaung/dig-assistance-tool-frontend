import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppConfigService } from "src/app/shared/service/config-service";
import { HttpCommonService } from "src/app/shared/service/http-common-service";

@Injectable({
    providedIn: 'root'
})
export class DockerManageService {

    public baseUrl: any = '';

    public bevDockerFile = new BehaviorSubject<any>(null);
    public bevDockerFiles = new BehaviorSubject<any>(null);
    public bevCreateDockerFile = new BehaviorSubject<any>(null);
    public bevUpdateDockerFile = new BehaviorSubject<any>(null);
    public bevDeleteDockerFile = new BehaviorSubject<any>(null);
    public bevDockerImageStatus = new BehaviorSubject<any>(null);

    constructor(
        private _configService: AppConfigService,
        private _httpCommonService: HttpCommonService,
        private _http: HttpClient
    ) {
        this.retrieveConfigService();
    }

    /**
     * Retrieve App Config Service
     */
    retrieveConfigService() {
        this._configService.getConfig().subscribe(
            res => {
                if (res) {
                    this.baseUrl = res.docker_manage_url;
                    console.log('Base Url =>', this.baseUrl);
                }
            }
        )
    }

    getDockerFiles() {
        this._httpCommonService.httpGet(`${this.baseUrl}/get_all`).subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        console.log('getDockerFiles => RES ', res);
                        const successData = res['data'];
                        this.bevDockerFiles.next(successData);
                    }
                },
                error: (error) => {
                    if (error) {
                        const errorData = error;
                        this.bevDockerFiles.next(errorData);
                    }
                    console.log('getDockerFiles => Error ', error);
                }
            }
        );
    }

    getDockerFileById(id: any) {
        this._httpCommonService.httpGet(this.baseUrl + '/detail/' + id).subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        console.log('get DockerFile By Id => RES ', res);
                        const successData = res['data'];
                        this.bevDockerFile.next(successData);
                    }
                },
                error: (error) => {
                    if (error) {
                        const errorData = error;
                        this.bevDockerFile.next(errorData);
                    }
                    console.log('get DockerFile By Id => Error ', error);
                }
            }
        );
    }

    createDockerFile(payload: any) {
        // let url = 'http://automatic-docker-image.test/api/v1/docker-manage';
        return this._httpCommonService.httpPost(this.baseUrl + '/create', payload).subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        console.log('create DockerFile => RES ', res);
                        const successData = res['data'];
                        this.bevCreateDockerFile.next(successData);
                    }
                },
                error: (error) => {
                    console.log('create DockerFile => Error ', error);
                    if (error) {
                        const errorData = error;
                        this.bevCreateDockerFile.next(errorData);
                    }
                }
            }
        );
    }

    updateDockerFile(id: any, payload: any) {
        return this._httpCommonService.httpPut(this.baseUrl + '/update/' + id, payload).subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        console.log('update DockerFile => RES ', res);
                        const successData = res['data'];
                        this.bevUpdateDockerFile.next(successData);
                    }
                },
                error: (error) => {
                    console.log('update DockerFile => Error ', error);
                    if (error) {
                        const errorData = error;
                        this.bevUpdateDockerFile.next(errorData);
                    }
                }
            }
        );
    }

    deleteDockerFile(id: any) {
        return this._httpCommonService.httpDelete(this.baseUrl + '/delete/' + id).subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        console.log('delete DockerFile => RES ', res);
                        const successData = res['data'];
                        this.bevDeleteDockerFile.next(successData);
                    }
                },
                error: (error) => {
                    console.log('delete DockerFile => Error ', error);
                    if (error) {
                        const errorData = error;
                        this.bevDeleteDockerFile.next(errorData);
                    }
                }
            }
        );
    }

    sendDockerImageStatus(id: any, name:any, status: any) {
        return this._httpCommonService.httpGet(this.baseUrl + '/application/' + id + '/' + name + '/image_status/' + status).subscribe(
            {
                next: (res: any) => {
                    if (res) {
                        console.log('Docker Image Status => RES ', res);
                        const successData = res['data'];
                        this.bevDockerImageStatus.next(successData);
                    }
                },
                error: (error) => {
                    console.log('Docker Image Status => Error ', error);
                    if (error) {
                        const errorData = error;
                        this.bevDockerImageStatus.next(errorData);
                    }
                }
            }
        );
    }


} 