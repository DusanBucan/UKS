import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubUser } from '../model/github_user';
import { Label } from '../model/label';
import { TaskRequest } from '../request/task';
import { GithubUserService } from '../services/github-user.service';
import { LabelService } from '../services/label.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css'],
})
export class IssueCreateComponent implements OnInit {
  public id: string;
  private users: GithubUser[] = [];
  private labels: Label[] = [];
  private newTask: TaskRequest = {
    title: '',
    description: '',
    due_date: '',
    opened: true,
    task_state: 'open',
    project: 0,
    labels: [],
    assignee: 0,
  };

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.projectId;
    this.loadUsers();
    this.loadLabels();
  }

  loadUsers() {
    this.projectService.getUsersByProject(this.id).subscribe(
      (response: GithubUser[]) => {
        if (response !== null) {
          this.users = response;
        }
      },
      (error) => {
        alert('ERROR' + error);
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
        alert('ERROR' + error);
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
    if (
      this.newTask.assignee > 0 &&
      this.newTask.title.length &&
      this.newTask.due_date
    ) {
      this.newTask.project = Number(this.id);
      this.taskService.createTask(this.newTask).subscribe(
        (response) => {
          if (response !== null) {
            alert('Issue Successfuly added!');
            this.router.navigate(['dashboard/home/' + this.id + '/' + this.id + '/issues']);
          }
        },
        (error) => {
          alert('ERROR' + error);
        }
      );
    } else {
      alert('Please fill the form properly before adding issue');
    }
  }
}
