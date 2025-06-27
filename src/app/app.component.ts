import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {

  loading = true;

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store) {

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.isLoggedIn$ = this.store
        .pipe(
        select(isLoggedIn)//or distinctUntilChanges() rxjs operator to fetch data only when it's changed
      )

      this.isLoggedOut$ = this.store
        .pipe(
          select(isLoggedOut)
        )

    }

    logout() {

    }

}
