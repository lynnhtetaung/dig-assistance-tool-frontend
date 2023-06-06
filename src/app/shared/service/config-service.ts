import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, lastValueFrom } from "rxjs";

declare var window: any; // To call index.html via window

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public appConfig = window.appConfig;
  public bevAppConfig = new BehaviorSubject<any>(null);

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Load application config
   */
  async loadAppConfig() {
    const configUrl = `assets/config/app-config.json`;
    const data = await lastValueFrom(this._http.get(configUrl));
    this.appConfig = Object.assign(data, this.appConfig);
    this.bevAppConfig.next(this.appConfig);
  }

  /**
   * Get config 
   * @returns bevAppConfig 
   */
  getConfig() {
    return this.bevAppConfig;
  }

}