import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly urlBase = 'http://localhost:8000/api/token/';

  constructor(private http: HttpClient) { }

  getToken(): string {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if ( currentUser!=='{}'){
      return currentUser['token'];
    }
    return "";
  }

  login(log: Login): Observable<Object>{
    return this.http.post(`${this.urlBase}`,log);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
  
}
