import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  content$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('slug')));

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
