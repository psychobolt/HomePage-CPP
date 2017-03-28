// libs
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { RouterExtensions, Config } from '../../shared/core/index';
import { IAppState, getGuestbook, getPosts } from '../../shared/ngrx/index';
import * as blog from '../../shared/blog/index';

@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  public guestbook$: Observable<any>;
  public newComment: string;

  constructor(private store: Store<IAppState>, public routerext: RouterExtensions) {}

  ngOnInit() {
    this.guestbook$ = this.store.let(getGuestbook);
    this.newComment = '';
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addComment(): boolean {
    this.store.dispatch(new blog.SignGuestbookAction(this.newComment));
    this.newComment = '';
    return false;
  }

  readAbout() {
    // Try this in the {N} app
    // {N} can use these animation options
    this.routerext.navigate(['/about'], {
      transition: {
        duration: 1000,
        name: 'slideTop',
      }
    });
  }
}
