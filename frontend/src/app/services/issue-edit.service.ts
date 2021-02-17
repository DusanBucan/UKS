import { Injectable } from "@angular/core";
import { Task } from "../model/task";

@Injectable({
  providedIn: "root",
})
export class IssueEditService {
  task: Task = null;
  constructor() {}

  setTask(task: Task): void {
    this.task = task;
  }

  getTask(): Task {
    return this.task;
  }
}
