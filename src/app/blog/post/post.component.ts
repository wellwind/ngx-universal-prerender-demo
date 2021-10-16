import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  content$ = this.route.data.pipe(
    map((data) => data.post),
    filter((data) => !!data),
    map((content) => this.domSanitizer.bypassSecurityTrustHtml(content))
  );

  title$ = this.route.data.pipe(map((data) => data.title || ''));

  constructor(
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title$.subscribe((title) => {
      this.title.setTitle(title);
    });
  }
}
