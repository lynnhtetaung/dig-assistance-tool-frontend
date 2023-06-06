import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './shared/service/config-service';
import { DockerInstructionsConfigService } from './shared/service/docker-instructions-config-service';

const appInit = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

const dockerInstructionsInit = (dockerConfig: DockerInstructionsConfigService) => {
  return () => {
    return dockerConfig.loadDockerInstructionsConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: dockerInstructionsInit,
      multi: true,
      deps: [DockerInstructionsConfigService]
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
