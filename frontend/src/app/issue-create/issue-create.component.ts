import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GithubUser } from "../model/github_user";
import { Label } from "../model/label";
import { Milestone } from "../model/milestone";
import { TaskRequest } from "../request/task";
import { GithubUserService } from "../services/github-user.service";
import { MilestoneService } from "../services/milestone.service";
import { ProjectService } from "../services/project.service";
import { TaskService } from "../services/task.service";

@Component({
  selector: "app-issue-create",
  templateUrl: "./issue-create.component.html",
  styleUrls: ["./issue-create.component.css"],
})
export class IssueCreateComponent implements OnInit {
  public id: string;
  private users: GithubUser[] = [];
  private loggedUser: GithubUser;
  private labels: Label[] = [];
  private milestones: Milestone[] = [];
  private milestoneID: number = 0;
  private newTask: TaskRequest = {
    title: "",
    description: "",
    due_date: "",
    opened: true,
    task_state: "open",
    project: 0,
    labels: [],
    milestones: [],
    assignee: 0,
    author: 0,
  };

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private githubUserService: GithubUserService,
    private milestoneService: MilestoneService
  ) {}

  ngOnInit() {
    this.getLoggedIn();
    this.id = this.route.snapshot.params.projectId;
    this.loadUsers();
    this.loadLabels();
    this.loadMilestones();
  }

  getLoggedIn() {
    this.githubUserService.getLoggedIn().subscribe(
      (response) => {
        if (response !== null) {
          this.loggedUser = response;
        }
      },
      (error) => {
        alert("ERROR");
      }
    );
  }

  loadUsers() {
    this.projectService.getUsersByProject(this.id).subscribe(
      (response: GithubUser[]) => {
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
    this.projectService.getLabelsByProject(this.id).subscribe(
      (response: Label[]) => {
        if (response !== null) {
          this.labels = response;
        }
      },
      (error) => {
        alert("ERROR" + error);
      }
    );
  }

  loadMilestones() {
    this.milestoneService.getMilestonesByProjectId(this.id).subscribe(
      (response: Milestone[]) => {
        if (response !== null) {
          this.milestones = response;
          console.log(response);
        }
      },
      (error) => {
        alert("ERROR" + error);
      }
    );
  }

  handleMilestoneClick(id: number) {
    if (this.milestoneID === id) {
      this.milestoneID = 0;
    } else {
      this.milestoneID = id;
    }
  }

  isMilestoneSelected(id: number): boolean {
    return this.milestoneID === id;
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

  handleAssigneeClick(id: number) {
    if (this.newTask.assignee === id) {
      this.newTask.assignee = 0;
    } else {
      this.newTask.assignee = id;
    }
  }

  isAssigneeSelected(id: number): boolean {
    return this.newTask.assignee === id;
  }

  createIssue() {
    if (this.newTask.title.length && this.newTask.due_date) {
      this.newTask = {
        ...this.newTask,
        author: this.loggedUser.id,
        project: Number(this.id),
        milestones: this.milestoneID > 0 ? [this.milestoneID] : [],
      };
      this.taskService.createTask(this.newTask).subscribe(
        (response) => {
          if (response !== null) {
            alert("Issue Successfuly added!");
            this.router.navigate([
              "dashboard/home/" + this.id + "/" + this.id + "/issues",
            ]);
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
