import { Component, OnInit } from "@angular/core";
import { Task } from "../model/task";
import { TaskService } from "../services/task.service";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  private issues: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (response) => {
        if (response !== null) {
          this.issues = response;
          console.log(response);
        }
      },
      (error) => {
        alert("ERROR" + error);
      }
    );
  }

  filterCreated(): Task[] {
    return this.issues.filter((i) => i.task_state === "open");
  }

  createdNum(): number {
    return this.issues.filter((i) => i.task_state === "open").length;
  }

  filterInProgress(): Task[] {
    return this.issues.filter((i) => i.task_state === "in progress");
  }

  inProgressNum(): number {
    return this.issues.filter((i) => i.task_state === "in progress").length;
  }

  filterInReview(): Task[] {
    return this.issues.filter((i) => i.task_state === "in review");
  }

  inReviewNum(): number {
    return this.issues.filter((i) => i.task_state === "in review").length;
  }

  filterDone(): Task[] {
    return this.issues.filter((i) => i.task_state === "done");
  }

  doneNum(): number {
    return this.issues.filter((i) => i.task_state === "done").length;
  }
}
