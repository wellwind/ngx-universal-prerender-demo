import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as markdownIt from 'markdown-it';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<string> {
  constructor(private httpClient: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    return this.httpClient
      .get(
        `${environment.assetsUrl}assets/blog/${route.paramMap.get('slug')}.md`,
        { responseType: 'text' }
      )
      .pipe(
        map((markdown) => markdownIt().render(markdown)),
        catchError(() => {
          return of('404');
        })
      );
  }
}
