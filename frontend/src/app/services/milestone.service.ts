import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Milestone } from '../model/milestone';

@Injectable({
  providedIn: 'root',
})
export class MilestoneService {
  milestoneUrl: string;
  constructor(private http: HttpClient) {
    this.milestoneUrl = environment.url + 'api/milestones/';
  }

  getMilestonesByProjectId(id: string) {
    return this.http.get(this.milestoneUrl + 'project/' + id + '/');
  }

  get(id: string) {
    return this.http.get(this.milestoneUrl + id + '/');
  }

  create(milestone: Milestone) {
    return this.http.post(this.milestoneUrl, milestone);
  }

  edit(id: string, milestone: Milestone) {
    return this.http.put(this.milestoneUrl + id + '/', milestone);
  }

  delete(id: string) {
    return this.http.delete(this.milestoneUrl + id + '/');
  }
}
