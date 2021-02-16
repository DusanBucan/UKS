import { Injectable } from '@angular/core';
import { HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Label } from '../model/label';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private readonly urlBase = 'http://localhost:8000/api/labels/';



  constructor(private http: HttpClient) { }

  getLabels(): Observable<Array<Label>> {
    return this.http.get<Array<Label>>(`${this.urlBase}`);
  }

  deleteLabel(id:Number):Observable<Object> {
    return this.http.delete(`${this.urlBase}`+id+'/');
  }

  createLabel(label: Label):Observable<Object>{
    return this.http.post(`${this.urlBase}`,label);
  }

  editLabel(label:Label, id: Number): Observable<Object>{
    return this.http.put(`${this.urlBase}`+id+'/',label);
  }



}
