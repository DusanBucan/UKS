import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Wiki } from '../model/wiki';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private readonly urlBase = environment.url + 'api/wiki/';
  private readonly urlBase2 = environment.url + 'api/projects/';
  private readonly urlBase3 = environment.url + 'api/wiki/du/';

  constructor(private http: HttpClient) { }

  getWiki(projectId: string): Observable<Wiki> {
    return this.http.get<Wiki>(`${this.urlBase}` + projectId + '/');
  }

  createWiki(wiki: object): Observable<object> {
    return this.http.post(`${this.urlBase}`, wiki);
  }

  deleteWiki(id: number): Observable<object> {
    return this.http.delete(`${this.urlBase3}` + id + '/');
  }

  editWiki(id: number, wiki: object): Observable<object> {
    return this.http.put(`${this.urlBase3}` + id + '/', wiki);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.urlBase2}` + id + '/');
  }


}
