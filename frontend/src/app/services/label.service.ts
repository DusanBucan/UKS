import { Injectable } from '@angular/core';
import { HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Label } from '../model/label';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private readonly urlBase = environment.url + 'api/labels/';

  constructor(private http: HttpClient) { }

  getLabels(): Observable<Array<Label>> {
    return this.http.get<Array<Label>>(`${this.urlBase}`);
  }

  deleteLabel(id: number): Observable<object> {
    return this.http.delete(`${this.urlBase}` + id + '/');
  }

  createLabel(label: Label, id: string): Observable<object> {
    return this.http.post(`${this.urlBase}add/${id}/`, label);
  }

  editLabel(label: Label, id: number): Observable<object> {
    return this.http.put(`${this.urlBase}` + id + '/', label);
  }



}
