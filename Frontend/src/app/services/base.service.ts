import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../data/interfaces/api.interface';
import { apiConfig } from 'src/assets/config/client-api-configuration';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' }) 
export class BaseService {
  private _apiConfig = apiConfig;

  constructor(private _http: HttpClient) {}

  get api(): ApiSettings | undefined {
    return this._apiConfig;
  }

  get http() {
    return this._http;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }


  private getAuthHeaders(): HttpHeaders | undefined {
    const token = this.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
  }

 
  doAuthenticate(username: string = 'username', password: string = 'password'): Observable<string> {
    const url = this._apiConfig.authentication.url;
    const body = { username, password };
    return this.http.post(url, body, { responseType: 'text' }).pipe(
      map((token: string) => {
        this.setToken(token);
        return token;
      }),
      catchError((error) => {
        console.error('Authentication failed', error);
        return throwError(() => error);
      })
    );
  }

}