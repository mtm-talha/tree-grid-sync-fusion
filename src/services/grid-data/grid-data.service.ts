import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GridDataService {
  private readonly baseUrl = `${environment.apiUrl}grid-data/`;

  constructor(private http: HttpClient) { }

  getFakeData():Observable<any> {
      return this.http.get("https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData")
  }
  
  getGridData(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  addRowInGridData(payload:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`,payload);
  }

  deleteRowInGridData(id:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}?id=${id}`);
  }

  updateRowInGridData(id:any,payload:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?id=${id}`,payload);
  }
}
