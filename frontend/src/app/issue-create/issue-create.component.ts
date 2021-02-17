import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GithubUser } from "../model/github_user";
import { Label } from "../model/label";
import { TaskRequest } from "../request/task";
import { GithubUserService } from "../services/github-user.service";
import { LabelService } from "../services/label.service";
import { TaskService } from "../services/task.service";

@Component({
  selector: "app-issue-create",
  templateUrl: "./issue-create.component.html",
  styleUrls: ["./issue-create.component.css"],
})
export class IssueCreateComponent implements OnInit {
  private users: GithubUser[] = [];
  private labels: Label[] = [];
  private newTask: TaskRequest = {
    title: "",
    description: "",
    due_date: "",
    opened: true,
    task_state: "open",
    project: 1,
    labels: [],
    assignee: 0,
    author: 0,
  };

  constructor(
    private userService: GithubUserService,
    private labelService: LabelService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadLabels();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        if (response !== null) {
          this.users = response;
        }
      },
      (error) => {
        alert("ERROR" + error);
      }
    );
  }

  loadLabels() {
    this.labelService.getLabels().subscribe(
      (response) => {
        if (response !== null) {
          this.labels = response;
        }
      },
      (error) => {
        alert("ERROR" + error);
      }
    );
  }

  handleLabelClick(id: number) {
    if (this.newTask.labels.find((n) => n === id)) {
      this.newTask.labels = this.newTask.labels.filter((n) => n !== id);
    } else {
      this.newTask.labels.push(id);
    }
  }

  isLabelAdded(id: number): boolean {
    return !!this.newTask.labels.find((n) => n === id);
  }

  handleAuthorClick(id: number) {
    if (this.newTask.author === id) {
      this.newTask.author = 0;
    } else {
      this.newTask.author = id;
    }
  }

  handleAssigneeClick(id: number) {
    if (this.newTask.assignee === id) {
      this.newTask.assignee = 0;
    } else {
      this.newTask.assignee = id;
    }
  }

  isAuthorSelected(id: number): boolean {
    return this.newTask.author === id;
  }

  isAssigneeSelected(id: number): boolean {
    return this.newTask.assignee === id;
  }

  createIssue() {
    if (
      this.newTask.assignee > 0 &&
      this.newTask.author > 0 &&
      this.newTask.title.length &&
      this.newTask.due_date
    ) {
      this.newTask.due_date = `${this.newTask.due_date} 00:00`;
      this.taskService.createTask(this.newTask).subscribe(
        (response) => {
          if (response !== null) {
            alert("Issue Successfuly added!");
            this.router.navigate(["dashboard/home/issues"]);
          }
        },
        (error) => {
          alert("ERROR" + error);
        }
      );
    } else {
      alert("Please fill the form properly before adding issue");
    }
  }
}
