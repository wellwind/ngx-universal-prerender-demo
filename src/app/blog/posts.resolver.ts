import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostMeta } from './post-meta.interface';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<PostMeta[]> {
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private state: TransferState) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PostMeta[]> {
    // 建立 cache server 狀態的 key
    const key = makeStateKey('assets/blog/posts.json');

    const cacheResult = this.state.get<PostMeta[]>(key, []);
    if (cacheResult.length > 0) {
      // 如果有 cache 資料，則直接回傳 cache 到的資料
      return of(cacheResult);
    } else {
      // 如果沒有 cache 資料，就從 API 抓取
      return this.httpClient.get<PostMeta[]>(`${environment.assetsUrl}assets/blog/posts.json`)
        .pipe(
          catchError(() => of([])),
          tap(result => {
            // 如果是在 server 端產生，則設定資料可以傳遞給前端 cache
            if (isPlatformServer(this.platformId)) {
              this.state.set<any[]>(key, result);
            }
          })
        );
    }
  }
}
