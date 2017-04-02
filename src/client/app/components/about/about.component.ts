import { Injector, Component } from '@angular/core';
import { Config } from '../../shared/core/index';

@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: [
    'about.component.css',
  ],
})
export class AboutComponent {

  // Just one way you could handle the {N} `ui/page` Page class
  // in a shared component...
  private _page: any;
  private get page() {
    if (Config.PageClass) {
      if (!this._page) {
        this._page = this.injector.get(Config.PageClass);
      }

      return this._page;
    }
  }

  constructor(private injector: Injector) {
    // This is here as an example
    // if (this.page) {
    //   this.page.actionBarHidden = true;
    // }
  }

  ngOnInit() {
    var win:any = window;
    win.LIRenderAll();
    var widget = new win.GitHubCard();
    widget.init();
  }
}
