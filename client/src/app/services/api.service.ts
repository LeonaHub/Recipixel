import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../config/database.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(`${apiConfig.baseUrl}/data`);
  }

  // other api...
}
