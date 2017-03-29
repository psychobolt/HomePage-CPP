// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

// app
import { BLOG_PROVIDERS } from './services';
import { AnalyticsService } from '../analytics';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    RouterModule
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
