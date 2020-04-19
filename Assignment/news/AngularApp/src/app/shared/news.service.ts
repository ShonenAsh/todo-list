import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { News } from './News.model';

@Injectable()
export class NewsService {
  selectedNews: News;
  Newss: News[];
  readonly baseURL = 'http://localhost:3000/News';

  constructor(private http: HttpClient) { }

  postNews(ply: News) {
    return this.http.post(this.baseURL, ply);
  }

  getNewsList() {
    return this.http.get(this.baseURL);
  }

  putNews(ply: News) {
    return this.http.put(this.baseURL + `/${ply._id}`, ply);
  }

  deleteNews(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
