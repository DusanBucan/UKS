import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GithubUser } from "../model/github_user";
import { Label } from "../model/label";
import { Task } from "../model/task";
import { GithubUserService } from "../services/github-user.service";
import { IssueEditService } from "../services/issue-edit.service";
import { LabelService } from "../services/label.service";
import { TaskService } from "../services/task.service";

@Component({
  selector: "app-issues",
  templateUrl: "./issues.component.html",
  styleUrls: ["./issues.component.css"],
})
export class IssuesComponent implements OnInit {
  private dropdownType = {
    unselected: "UNSELECTED",
    filter: "FILTER",
    author: "AUTHOR",
    label: "LABEL",
    project: "PROJECT",
    milestone: "MILESTONE",
    assignee: "ASSIGNEE",
    sort: "SORT",
  };
  private dropdownSelected: string = "";
  private issues: Task[] = [];
  private users: GithubUser[] = [];
  private labels: Label[] = [];
  private openedSelected: boolean = true;
  private storedIssues: Task[] = [];

  constructor(
    private taskService: TaskService,
    private userService: GithubUserService,
    private labelService: LabelService,
    private router: Router,
    private taskEditService: IssueEditService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadUsers();
    this.loadLabels();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (response) => {
        if (response !== null) {
          this.issues = response;
          this.storedIssues = response;
        }
      },
      (error) => {
        alert("ERROR" + error);
      }
    );
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

  selectDropdown(select: string) {
    this.dropdownSelected = select;
    console.log(this.dropdownSelected);
  }

  openedIssues(): number {
    return this.storedIssues.filter((i) => i.opened).length;
  }

  closedIssues(): number {
    return this.storedIssues.filter((i) => !i.opened).length;
  }

  selectOpenedIssues() {
    this.issues = this.storedIssues.filter((i) => i.opened);
    this.openedSelected = true;
  }

  selectClosedIssues() {
    this.issues = this.storedIssues.filter((i) => !i.opened);
    this.openedSelected = false;
  }

  filterIssues(
    criteria: "open" | "in progress" | "in review" | "closed" | "all"
  ): void {
    if (criteria === "all") {
      this.issues = this.storedIssues;
    } else {
      this.issues = this.storedIssues.filter((i) => i.task_state === criteria);
    }
    this.selectDropdown("");
  }

  filterAssignee(username: string): void {
    this.issues = this.storedIssues.filter(
      (i) => i.assignee.user.username === username
    );
    this.selectDropdown("");
  }

  filterAuthor(username: string): void {
    this.issues = this.storedIssues.filter(
      (i) => i.author.user.username === username
    );
    this.selectDropdown("");
  }

  filterLabel(title: string): void {
    this.issues = this.storedIssues.filter((i) =>
      i.labels.find((l) => l.title === title)
    );
  }

  newIssue() {
    this.router.navigate(["dashboard/home/issue-create"]);
  }

  editIssue(task: Task) {
    this.taskEditService.setTask(task);
    this.router.navigate(["dashboard/home/issue-edit"]);
  }
}
