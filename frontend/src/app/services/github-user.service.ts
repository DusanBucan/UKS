import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GithubUser } from "../model/github_user";
import { environment } from 'src/environments/environment';
import { Project } from '../model/project';
import { Team } from '../model/team';

@Injectable({
  providedIn: "root",
})
export class GithubUserService {
  private readonly urlBase = environment.url+"api/github_users/";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<GithubUser>> {
    return this.http.get<Array<GithubUser>>(`${this.urlBase}`);
  }

  deleteUser(id: Number): Observable<Object> {
    alert(`${this.urlBase}` + id + "/");
    return this.http.delete(`${this.urlBase}` + id + "/");
  }

  createUser(githubUser: GithubUser): Observable<Object> {
    return this.http.post(`${this.urlBase}`, githubUser);
  }

  editUser(github_user: GithubUser, id: Number): Observable<Object> {
    return this.http.put(`${this.urlBase}` + id + "/", github_user);
  }

  getLoggedIn():Observable<GithubUser>{
    return this.http.get<GithubUser>(`${this.urlBase}`+"loggedIn/");
  }

  getUsersProjects():Observable<Array<Project>>{
    return this.http.get<Array<Project>>(`${this.urlBase}`+"projects/");
  }

  getUsersTeams():Observable<Array<Team>>{
    return this.http.get<Array<Team>>(`${this.urlBase}`+"teams/");
  }
}
