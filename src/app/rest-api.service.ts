import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiUrl = environment.origin;

  constructor(private http: HttpClient) { }

  getRequest(url) {
    return this.http.get(this.apiUrl + url);
  }

  postequest(url, data) {
    return this.http.post(this.apiUrl + url, data);
  }

}
