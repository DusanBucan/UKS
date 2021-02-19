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

  createProject(project: Project, added_users : Array<any>, added_teams : Array<any>): Observable<object> {

    for (let github_user of added_users){
      project.users.push(github_user.id);
    }
    for (let team of added_teams){
      for (let user of team.git_users){
        let exists = false;
        project.users.push(user);
      }
    }
    return this.http.post(`${this.projectUrl}`, project);
  }

  deleteProject(id: number): Observable<object> {
    
    return this.http.delete(`${this.projectUrl}` + id + '/');
  }

  // create(milestone: Milestone) {
  //   return this.http.post(this.milestoneUrl, milestone);
  // }

  // edit(id: string, milestone: Milestone) {
  //   return this.http.put(this.milestoneUrl + id + '/', milestone);
  // }

  // delete(id: string) {
  //   return this.http.delete(this.milestoneUrl + id + '/');
  // }
}
