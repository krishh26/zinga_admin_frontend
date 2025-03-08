import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export enum GroundEndPoint {
  GET_DASHBOARD_GROUND_STAFF = '/ground/dashboard/ground-staff',
  GET_COMPLETED_DASHBOARD_GROUND_STAFF = '/ground/completed/ground-staff',
  GET_ALL_GROUNDS = '/ground',
  GET_GROUND_DETAILS = '/ground/:id',
  CREATE_GROUND = '/ground',
  UPDATE_GROUND = '/ground/:id',
  DELETE_GROUND = '/ground/:id'

}

@Injectable({
  providedIn: 'root'
})
export class GroundsService {

  baseUrl!: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Ensure the token is stored as a string
  }

  getHeader(): HttpHeaders {
    let token = this.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '', // Add token if it exists
    });
    return headers;
  }

  getDashboardGroundStaff(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + GroundEndPoint.GET_DASHBOARD_GROUND_STAFF, {
      headers: this.getHeader(),
    });
  }

  getCompletedDashboardGroundStaff(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + GroundEndPoint.GET_COMPLETED_DASHBOARD_GROUND_STAFF, {
      headers: this.getHeader(),
    });
  }

  getAllGround(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + GroundEndPoint.GET_ALL_GROUNDS, {
      headers: this.getHeader(),
    });
  }

  getGroundDetails(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + GroundEndPoint.GET_GROUND_DETAILS, {
      headers: this.getHeader(),
    });
  }

  createGround(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + GroundEndPoint.CREATE_GROUND, payload,
      { headers: this.getHeader() }
    );
  }

  updateGround(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + GroundEndPoint.UPDATE_GROUND, payload,
      { headers: this.getHeader() }
    );
  }

  deleteGround(): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + GroundEndPoint.DELETE_GROUND);
  }


}
