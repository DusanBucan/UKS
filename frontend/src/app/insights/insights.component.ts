import { Component, OnInit, ViewChild } from "@angular/core";

import { ChartComponent } from "ng-apexcharts";
import { GithubUser } from "../model/github_user";
import { Task } from "../model/task";
import { GithubUserService } from "../services/github-user.service";
import { TaskService } from "../services/task.service";

@Component({
  selector: "app-insights",
  templateUrl: "./insights.component.html",
  styleUrls: ["./insights.component.css"],
})
export class InsightsComponent implements OnInit {
  @ViewChild("chart", { static: false, read: "" }) chart: ChartComponent;
  public tasksStateChart: Partial<any> = {};
  public taskOpenedChart: Partial<any> = {};
  private issues: Task[] = [];
  private users: GithubUser[] = [];
  private usersStateInsights: any[] = [];
  private usersOpenedInsights: any[] = [];

  private selectChoice = {
    issuesGeneral: "ISSUES_GENERAL",
    issuesByUser: "ISSUES_BY_USER",
  };
  private selectedChoice: string = "ISSUES_GENERAL";

  ngOnInit() {
    this.loadTasks();
  }

  constructor(
    private taskService: TaskService,
    private userService: GithubUserService
  ) {}

  chooseChoice(choice: string) {
    this.selectedChoice = choice;
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (response) => {
        if (response !== null) {
          this.issues = response;
          this.loadTasksData();
          this.loadTasksOpenedData();
          this.loadUsers();
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
          this.usersStateInsights = response.map((d) =>
            this.loadTasksByUser(d.user.username)
          );
          this.usersOpenedInsights = response.map((d) =>
            this.loadTasksOpenedByuser(d.user.username)
          );
        }
      },
      (error) => {
        alert("ERROR" + error);
      }
    );
  }

  loadTasksData() {
    this.tasksStateChart = {
      series: [
        this.createdNum(),
        this.inProgressNum(),
        this.inReviewNum(),
        this.doneNum(),
      ],
      labels: ["Created", "In Progress", "In Review", "Done"],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }

  loadTasksByUser(username: string) {
    return {
      series: [
        this.createdByUse(username),
        this.inProgressByUse(username),
        this.inReviewByUse(username),
        this.doneByUse(username),
      ],
      labels: ["Created", "In Progress", "In Review", "Done"],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }

  loadTasksOpenedByuser(username: string) {
    return {
      series: [this.openedByUse(username), this.closedByUse(username)],
      labels: ["Opened", "Closed"],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }

  loadTasksOpenedData() {
    this.taskOpenedChart = {
      series: [this.openedNum(), this.closedNum()],
      labels: ["Opened", "Closed"],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }

  createdNum(): number {
    return this.issues.filter((i) => i.task_state === "open").length;
  }

  inProgressNum(): number {
    return this.issues.filter((i) => i.task_state === "in progress").length;
  }

  inReviewNum(): number {
    return this.issues.filter((i) => i.task_state === "in review").length;
  }

  doneNum(): number {
    return this.issues.filter((i) => i.task_state === "done").length;
  }

  openedNum(): number {
    return this.issues.filter((i) => i.opened).length;
  }

  closedNum(): number {
    return this.issues.filter((i) => !i.opened).length;
  }

  isUsersTask(task: Task, username: string): boolean {
    return task.assignee ? task.assignee.user.username === username : false;
  }

  createdByUse(username: string): number {
    return this.issues.filter(
      (i) => i.task_state === "open" && this.isUsersTask(i, username)
    ).length;
  }

  inProgressByUse(username: string): number {
    return this.issues.filter(
      (i) => i.task_state === "in progress" && this.isUsersTask(i, username)
    ).length;
  }

  inReviewByUse(username: string): number {
    return this.issues.filter(
      (i) => i.task_state === "in review" && this.isUsersTask(i, username)
    ).length;
  }

  doneByUse(username: string): number {
    return this.issues.filter(
      (i) => i.task_state === "done" && this.isUsersTask(i, username)
    ).length;
  }

  openedByUse(username: string): number {
    return this.issues.filter((i) => i.opened && this.isUsersTask(i, username))
      .length;
  }

  closedByUse(username: string): number {
    return this.issues.filter((i) => !i.opened && this.isUsersTask(i, username))
      .length;
  }
}
