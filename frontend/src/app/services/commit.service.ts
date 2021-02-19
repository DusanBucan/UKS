import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommitRequest } from '../request/commit';

@Injectable({
  providedIn: 'root'
})
export class CommitService {
  commitUrl: string;
  constructor(private http: HttpClient) {
    this.commitUrl = environment.url + 'api/commit/';
  }

  getCommitByProjectId(id: string) {
    return this.http.get(this.commitUrl + 'project/' + id + '/');
  }

  get(id: string) {
    return this.http.get(this.commitUrl + id + '/');
  }

  create(commit: CommitRequest) {
    return this.http.post(this.commitUrl, commit);
  }

  getCommitsByUserAndProject(userId: number, projectId: string) {
    return this.http.get(this.commitUrl + 'project/' + projectId + '/' + userId + '/');
  }

  getCommitsByOrderAndProject(order: number, projectId: string) {
    return this.http.get(this.commitUrl + 'project/' + projectId + '/order/' + order + '/');
  }
}
