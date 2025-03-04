import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';

export enum AuthEndPoint {
  LOGIN_USER = '/user/auth',
  FORGOT_PASSWORD = '/auth/forgot-password',
  RESET_PASSWORD = 'auth/reset-password',
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  baseUrl!: string;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  loginUser(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + AuthEndPoint.LOGIN_USER,
      payload,
      { headers: this.getHeader() }
    );
  }

  forgotUser(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + AuthEndPoint.FORGOT_PASSWORD,
      payload,
      { headers: this.getHeader() }
    );
  }

  resetUser(payload: any, token: string): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}${AuthEndPoint.RESET_PASSWORD}?token=${token}`,
      payload,
      { headers: this.getHeader() }
    );
  }

  logout(): void {
    this.localStorageService.clearStorage();
    this.router.navigateByUrl('/');
  }
}
