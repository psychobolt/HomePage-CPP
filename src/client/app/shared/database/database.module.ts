// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';

// app
import { DATABASE_PROVIDERS } from './services/index';

@NgModule({
  providers: [
    DATABASE_PROVIDERS
  ]
})
export class DatabaseModule {

  constructor(@Optional() @SkipSelf() parentModule: DatabaseModule) {
    if (parentModule) {
      throw new Error('DatabaseModule already loaded; Import in root module only.');
    }
  }
}
