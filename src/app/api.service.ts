import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getData(apiUrl: string) {
    return this.http.get(apiUrl);
  }

  postData(apiUrl: string, data: any) {
    return this.http.post(apiUrl, data, { responseType: 'text' });
  }

  putData(apiUrl: string, data: any) {
    return this.http.put(apiUrl, data, { responseType: 'text' });
  }

  deleteData(apiUrl: string) {
    return this.http.delete(apiUrl, { responseType: 'text' });
  }

  patchData(apiUrl: string, data: any) {
    return this.http.patch(apiUrl, data, { responseType: 'text' });
  }
}
