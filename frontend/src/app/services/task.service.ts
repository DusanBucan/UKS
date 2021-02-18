import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { TaskRequest } from '../request/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private readonly urlBase = 'http://localhost:8000/api/tasks/';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${this.urlBase}`);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.urlBase}/${id}`);
  }

  createTask(task: TaskRequest): Observable<object> {
    return this.http.post(`${this.urlBase}`, task);
  }

  editTask(task: TaskRequest, id: string): Observable<object> {
    return this.http.put(`${this.urlBase}` + id + '/', task);
  }

  getTasksByMilestone(id: string): Observable<object> {
    return this.http.get(this.urlBase + 'milestone/' + id + '/');
  }

  getTasksByProject(id: string) {
    return this.http.get(this.urlBase + 'project/' + id + '/');
  }
}
