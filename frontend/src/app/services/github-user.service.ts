import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubUser } from '../model/github_user';

@Injectable({
  providedIn: 'root'
})
export class GithubUserService {

  private readonly urlBase = 'http://10.106.13.7:8000/api/github_users/';
  // private readonly urlBase = 'http://localhost:8000/api/github_users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<GithubUser>> {
    return this.http.get<Array<GithubUser>>(`${this.urlBase}`);
  }

  deleteUser(id:Number):Observable<Object> {
    alert(`${this.urlBase}`+id+'/');
    return this.http.delete(`${this.urlBase}`+id+'/');
  }

  createUser(githubUser: GithubUser):Observable<Object>{
    return this.http.post(`${this.urlBase}`,githubUser);
  }

  editUser(github_user: GithubUser, id: Number): Observable<Object>{
    return this.http.put(`${this.urlBase}`+id+'/',github_user);
  }

}
