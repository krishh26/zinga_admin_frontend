import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export enum UserEndPoint {
  USER_LIST = '/user/member',
  USER = '/user',
  ADD_USER = '/user/member',
  UPDATE_USER = '/user/update',
  REGISTER_USER = '/user/member',
  LOGIN_USER = '/user/auth',
  RESET_PASSWORD = '/user/reset-password',
  DELETE_USER = '/user/delete/:id'
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

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

  getUserList(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + UserEndPoint.USER_LIST, {
      headers: this.getHeader(),
    });
  }

  createUser(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + UserEndPoint.ADD_USER, payload,
      { headers: this.getHeader() }
    );
  }

  resetPassword(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + UserEndPoint.RESET_PASSWORD, payload,
      { headers: this.getHeader() }
    );
  }


  registerUser(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + UserEndPoint.REGISTER_USER, payload,
      { headers: this.getHeader() }
    );
  }

  loginUser(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + UserEndPoint.LOGIN_USER, payload,
      { headers: this.getHeader() }
    );
  }

  updateUser(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + UserEndPoint.UPDATE_USER, payload,
      { headers: this.getHeader() }
    );
  }

  deleteUser(id: string): Observable<any> {
    const url = this.baseUrl + UserEndPoint.DELETE_USER.replace(':id', id);
    return this.httpClient.delete<any>(url, { headers: this.getHeader() });
  }

  getUsersByRole(role: string): Observable<any> {
    const params = new HttpParams().set('role', role);
    return this.httpClient.get<any>(this.baseUrl + UserEndPoint.USER, {
      headers: this.getHeader(),
      params: params
    });
  }

}
