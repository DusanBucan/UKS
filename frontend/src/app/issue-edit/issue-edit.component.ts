import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GithubUser } from "../model/github_user";
import { Label } from "../model/label";
import { TaskRequest } from "../request/task";
import { GithubUserService } from "../services/github-user.service";
import { IssueEditService } from "../services/issue-edit.service";
import { LabelService } from "../services/label.service";
import { TaskService } from "../services/task.service";

@Component({
  selector: "app-issue-edit",
  templateUrl: "./issue-edit.component.html",
  styleUrls: ["./issue-edit.component.css"],
})
export class IssueEditComponent implements OnInit {
  private users: GithubUser[] = [];
  private labels: Label[] = [];
  private editTask: TaskRequest = {
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
    private taskEditService: IssueEditService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadLabels();
    const task = this.taskEditService.getTask();
    this.editTask = {
      ...this.editTask,
      title: task.title,
      description: task.description,
      due_date: task.due_date.substr(0, 10),
      opened: task.opened,
      task_state: task.task_state,
      labels: task.labels.map((l) => l.id),
      assignee: task.assignee.id,
      author: task.author.id,
    };
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

  openIssue() {
    this.editTask.opened = true;
  }

  closeIssue() {
    this.editTask.opened = false;
  }

  markCreated() {
    this.editTask.task_state = "open";
  }

  markInProgress() {
    this.editTask.task_state = "in progress";
  }

  markInReview() {
    this.editTask.task_state = "in review";
  }

  markDone() {
    this.editTask.task_state = "done";
  }

  handleLabelClick(id: number) {
    if (this.editTask.labels.find((n) => n === id)) {
      this.editTask.labels = this.editTask.labels.filter((n) => n !== id);
    } else {
      this.editTask.labels.push(id);
    }
  }

  isLabelAdded(id: number): boolean {
    return !!this.editTask.labels.find((n) => n === id);
  }

  handleAuthorClick(id: number) {
    if (this.editTask.author === id) {
      this.editTask.author = 0;
    } else {
      this.editTask.author = id;
    }
  }

  handleAssigneeClick(id: number) {
    if (this.editTask.assignee === id) {
      this.editTask.assignee = 0;
    } else {
      this.editTask.assignee = id;
    }
  }

  isAuthorSelected(id: number): boolean {
    return this.editTask.author === id;
  }

  isAssigneeSelected(id: number): boolean {
    return this.editTask.assignee === id;
  }

  editIssue() {
    if (
      this.editTask.assignee > 0 &&
      this.editTask.author > 0 &&
      this.editTask.title.length &&
      this.editTask.due_date
    ) {
      this.editTask.due_date = `${this.editTask.due_date} 00:00`;
      this.taskService
        .editTask(this.editTask, this.taskEditService.getTask().id)
        .subscribe(
          (response) => {
            if (response !== null) {
              alert("Issue Successfuly edited!");
              this.router.navigate(["dashboard/home/issues"]);
            }
          },
          (error) => {
            alert("ERROR" + error);
          }
        );
    } else {
      alert("Please fill the form properly before editing issue");
    }
  }
}
