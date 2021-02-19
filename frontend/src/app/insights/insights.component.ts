import { Component, OnInit, ViewChild } from "@angular/core";

import { ChartComponent } from "ng-apexcharts";
import { GithubUser } from "../model/github_user";
import { Task } from "../model/task";
import { GithubUserService } from "../services/github-user.service";
import { TaskService } from "../services/task.service";
import { Commit } from '../model/commit';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { CommitService } from '../services/commit.service';

@Component({
  selector: "app-insights",
  templateUrl: "./insights.component.html",
  styleUrls: ["./insights.component.css"],
})
export class InsightsComponent implements OnInit {
  @ViewChild("chart", { static: false, read: "" }) chart: ChartComponent;
  public tasksStateChart: Partial<any> = {};
  public taskOpenedChart: Partial<any> = {};
  public commitsUsers: Partial<any>={};
  private issues: Task[] = [];
  private users: GithubUser[] = [];
  private usersStateInsights: any[] = [];
  private usersOpenedInsights: any[] = [];
  private projectUsers: GithubUser[]=[];
  private commits: Commit[]=[];
  private projectId: string;

  private selectChoice = {
    issuesGeneral: "ISSUES_GENERAL",
    issuesByUser: "ISSUES_BY_USER",
    commits: "COMMITS",
  };
  private selectedChoice: string = "ISSUES_GENERAL";

  ngOnInit() {
    this.projectId = this.route.snapshot.params.projectId;
    this.loadTasks();
    this.loadProject();
  }

  constructor(
    private taskService: TaskService,
    private userService: GithubUserService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private commitService: CommitService
  ) {}

  chooseChoice(choice: string) {
    this.selectedChoice = choice;
    if(this.selectedChoice=="COMMITS"){
      this.chartCommits();
    }
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

  loadProject(){
    this.projectService
    .getUsersByProject(this.projectId)
    .subscribe((data: GithubUser[]) => {
      this.projectUsers = data;
    });

    this.commitService
    .getCommitByProjectId(this.projectId)
    .subscribe((data: Commit[]) => {
      this.commits = data;
    });

  }

  chartCommits(){
    var values = this.getCommits();
    var first = values[0];
    var second = values[1];
    this.commitsUsers = {
      series: [
        {
          name: "distibuted",
          data: first
        }
      ],
      chart: {
        height: 550,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "65%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: second,
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "18px"
          }
        }
      }
    };
  }

  getUsernames(){
    var usernames = [];
    for(var i = 0; i< this.projectUsers.length;i++){
      usernames[i]=this.projectUsers[i].user.username;
    }
    return usernames;
  }

  getCommits(){
    var commits = [];
    var usernames = this.getUsernames();
    for(var j = 0; j<usernames.length;j++){
        commits[j] = this.commits.filter((i) =>i.user.user.username === usernames[j] ).length
    }
    for(let i = 0; i < commits.length; i++) {
      for(let j = 0; j < commits.length - 1; j++) {

          if(commits[j] < commits[j + 1]) {
              let swap = commits[j];
              commits[j] = commits[j + 1];
              commits[j + 1] = swap;
              let swap2 = usernames[j];
              usernames[j] = usernames[j + 1];
              usernames[j + 1] = swap2;
          }
      }
    }
    return [commits,usernames];
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
