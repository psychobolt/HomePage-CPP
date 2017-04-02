// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

// app
import { DatabaseModule } from '../database/database.module';
import { BLOG_PROVIDERS } from './services/index';
import { AnalyticsService } from '../analytics/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    RouterModule,
    DatabaseModule
  ],
  providers: [
    BLOG_PROVIDERS
  ]
})
export class BlogModule {

  constructor(@Optional() @SkipSelf() parentModule: BlogModule) {
    if (parentModule) {
      throw new Error('BlogModule already loaded; Import in root module only.');
    }
  }
}
