import { PostMeta } from './../post-meta.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts$ = this.route.data.pipe(map((data) => data.posts as PostMeta[]));

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
