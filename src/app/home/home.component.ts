import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos$ = this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/todos');

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }
}
