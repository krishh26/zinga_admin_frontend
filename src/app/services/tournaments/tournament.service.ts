import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


export enum TournamentEndPoint {
  GET_TOURNAMENT_LIST = '/tournament',
  CREATE_TOURNAMENT = '/tournament',
  UPDATE_TOURNAMENT = '/tournament/:id',
  DELETE_TOURNAMENT = '/tournament/:id'

}

@Injectable({
  providedIn: 'root'
})

export class TournamentService {

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

  getTournamentList(status: string, queryParams?: any): Observable<any> {
    let params = new HttpParams().set('status', status);

    if (queryParams) {
      if (queryParams.name) {
        params = params.set('name', queryParams.name);
      }
      if (queryParams.city) {
        params = params.set('city', queryParams.city);
      }
      if (queryParams.startDate) {
        params = params.set('startDate', queryParams.startDate);
      }
    }

    return this.httpClient.get<any>(this.baseUrl + TournamentEndPoint.GET_TOURNAMENT_LIST, { params });
  }

  createTournament(tournament: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + TournamentEndPoint.CREATE_TOURNAMENT, tournament, {
      headers: this.getHeader(),
    });
  }

  deleteTournament(id: string): Observable<any> {
    const url = this.baseUrl + TournamentEndPoint.DELETE_TOURNAMENT.replace(':id', id);
    return this.httpClient.delete<any>(url, {
      headers: this.getHeader(),
    });
  }
}
