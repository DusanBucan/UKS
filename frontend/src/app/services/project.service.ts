import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectUrl: string;
  constructor(private http: HttpClient) {
    this.projectUrl = environment.url + 'api/projects/';
  }

  getProjectsByUser() {
    return this.http.get(this.projectUrl + 'user/');
  }

  get(id: string) {
    return this.http.get(this.projectUrl + id + '/');
  }

  getUsersByProject(id: string) {
    return this.http.get(this.projectUrl + id + '/users/');
  }

  getLabelsByProject(id: string) {
    return this.http.get(this.projectUrl + id + '/labels/');
  }

  createProject(project: Project): Observable<object> {
    return this.http.post(`${this.projectUrl}`, project);
  }
}
