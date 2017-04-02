// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { Http } from '@angular/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader } from '@ngx-translate/core';
import { MarkdownModule } from 'angular2-markdown';

// app
import { APP_COMPONENTS, AppComponent } from './app/components/index';
import { routes } from './app/components/app.routes';
import { CustomReuseStrategy } from './app/components/reuse-strategy';

// feature modules
import { CoreModule } from './app/shared/core/core.module';
import { AppReducer } from './app/shared/ngrx/index';
import { AnalyticsModule } from './app/shared/analytics/analytics.module';
import { MultilingualModule, translateLoaderFactory } from './app/shared/i18n/multilingual.module';
import { MultilingualEffects } from './app/shared/i18n/index';
import { SampleModule } from './app/shared/sample/sample.module';
import { NameListEffects } from './app/shared/sample/index';
import { BlogModule } from './app/shared/blog/blog.module';
import { BlogEffects } from './app/shared/blog/index';
import { DatabaseModule } from './app/shared/database/database.module';
import { FIREBASE } from './app/shared/database/index';

// config
import { Config, WindowService, ConsoleService } from './app/shared/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
if (String('<%= BUILD_TYPE %>') === 'dev') {
  // only output console logging in dev mode
  Config.DEBUG.LEVEL_4 = true;
}

// sample config (extra)
import { AppConfig } from './app/shared/sample/services/app-config';
import { MultilingualService } from './app/shared/i18n/services/multilingual.service';
// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;

let routerModule = RouterModule.forRoot(routes);

if (String('<%= TARGET_DESKTOP %>') === 'true') {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  routerModule = RouterModule.forRoot(routes, {useHash: true});
}

declare var window, console;

// For AoT compilation to work:
export function win() {
  return window;
}
export function cons() {
  return console;
}

let DEV_IMPORTS: any[] = [];

if (String('<%= BUILD_TYPE %>') === 'dev') {
  DEV_IMPORTS = [
    ...DEV_IMPORTS,
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ];
}

var firebasePlugin = require('firebase');

export function firebaseFactory() {
  return firebasePlugin.firebase;
}

@NgModule({
  imports: [
    BrowserModule,
    CoreModule.forRoot([
      { provide: WindowService, useFactory: (win) },
      { provide: ConsoleService, useFactory: (cons) }
    ]),
    routerModule,
    AnalyticsModule,
    MultilingualModule.forRoot([{
      provide: TranslateLoader,
      deps: [Http],
      useFactory: (translateLoaderFactory)
    }]),
    MarkdownModule.forRoot(),
    SampleModule,
    DatabaseModule,
    BlogModule,
    StoreModule.provideStore(AppReducer),
DEV_IMPORTS,
    EffectsModule.run(MultilingualEffects),
    EffectsModule.run(NameListEffects),
    EffectsModule.run(BlogEffects)
  ],
  declarations: [
    APP_COMPONENTS
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    {
      provide: RouteReuseStrategy, useClass: CustomReuseStrategy
    },
    { 
      provide: FIREBASE, useFactory: (firebaseFactory)
    }
  ],
  bootstrap: [AppComponent]
})

export class WebModule { }
