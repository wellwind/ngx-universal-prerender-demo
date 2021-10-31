import { isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-universal-prerender-demo';

  isServer = isPlatformServer(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }
}
