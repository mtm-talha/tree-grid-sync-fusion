import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColumnSettingService {
  private readonly baseUrl = `${environment.apiUrl}column/`;

  constructor(private http: HttpClient) { }

  getColumnSetting(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}column-setting`);
  }

  getColumn(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  addColumn(payload:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`,payload);
  }

  deleteColumn(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}?id=${id}`);
  }

  updateColumn(id:any,payload:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?id=${id}`,payload);
  }

  reorderColumn(payload:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}reorder`,payload);
  }

}
