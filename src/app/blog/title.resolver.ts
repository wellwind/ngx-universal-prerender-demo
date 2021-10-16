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
import { PostMeta } from './post-meta.interface';

@Injectable({
  providedIn: 'root',
})
export class TitleResolver implements Resolve<string> {
  constructor(private httpClient: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    return this.httpClient
      .get<PostMeta[]>(`${environment.assetsUrl}assets/blog/posts.json`)
      .pipe(
        catchError(() => of([] as PostMeta[])),
        map(
          (posts: PostMeta[]) =>
            posts.find((post) => post.slug === route.paramMap.get('slug'))
              ?.title || ''
        )
      );
  }
}
