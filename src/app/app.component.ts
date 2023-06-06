import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './shared/service/config-service';
import { DockerInstructionsConfigService } from './shared/service/docker-instructions-config-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'dynamic-docker-portal';

  constructor(
    private _configService: AppConfigService,
    private _dockerInstructionService: DockerInstructionsConfigService
  ) {

  }

  ngOnInit() {
    this.initSubscribe();
  }

  /**
   * fetch application configuration
   */
  getAppConfig() {
    this._configService.loadAppConfig();
    this._dockerInstructionService.loadDockerInstructionsConfig();
  }

  /**
   * Initialize the subscription
   */
  initSubscribe() {
   
  }


}
