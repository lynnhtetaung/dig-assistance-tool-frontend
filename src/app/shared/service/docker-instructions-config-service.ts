import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, lastValueFrom } from "rxjs";

declare var window: any; // To call index.html via window

@Injectable({
  providedIn: 'root'
})
export class DockerInstructionsConfigService {

  public appConfig = window.appConfig;
  public bevDockerInstructionsConfig = new BehaviorSubject<any>(null);

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Load application config
   */
  async loadDockerInstructionsConfig() {
    const configUrl = `assets/config/docker-instruction.json`;
    const data = await lastValueFrom(this._http.get(configUrl));
    this.appConfig = Object.assign(data, this.appConfig);
    this.bevDockerInstructionsConfig.next(this.appConfig);
  }

  /**
   * Get config 
   * @returns bevDockerInstructionsConfig 
   */
  getDockerInstructionsConfig() {
    return this.bevDockerInstructionsConfig;
  }

}