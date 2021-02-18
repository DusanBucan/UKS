import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
