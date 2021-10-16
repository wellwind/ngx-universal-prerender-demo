import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostMeta } from './post-meta.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsResolver implements Resolve<PostMeta[]> {
  constructor(private httpClient: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PostMeta[]> {
    return this.httpClient
      .get<PostMeta[]>(`${environment.assetsUrl}assets/blog/posts.json`)
      .pipe(catchError(() => of([])));
  }
}
