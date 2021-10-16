import { TitleResolver } from './title.resolver';
import { PostResolver } from './post.resolver';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsResolver } from './posts.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { posts: PostsResolver },
    component: PostsComponent,
  },
  {
    path: 'post/:slug',
    resolve: {
      post: PostResolver,
      title: TitleResolver
    },
    component: PostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
