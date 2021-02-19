import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubUser } from '../model/github_user';
import { Label } from '../model/label';
import { Milestone } from '../model/milestone';
import { Task } from '../model/task';
import { TaskRequest } from '../request/task';
import { MilestoneService } from '../services/milestone.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css'],
})
export class IssueEditComponent implements OnInit {
  public projectId: string;
  public id: string;
  private users: GithubUser[] = [];
  private labels: Label[] = [];
  private milestones: Milestone[] = [];
  private milestoneID = 0;
  private editTask: TaskRequest = {
    title: '',
    description: '',
    due_date: '',
    opened: true,
    task_state: 'open',
    project: 1,
    labels: [],
    milestones: [],
    assignee: 0,
    author: 0,
  };

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private milestoneService: MilestoneService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params.projectId;
    this.id = this.route.snapshot.params.id;
    this.loadUsers();
    this.loadLabels();
    this.loadMilestones();
    this.taskService.getTask(this.id).subscribe((task: Task) => {
      this.editTask = {
        ...this.editTask,
        title: task.title,
        description: task.description,
        due_date: new Date(task.due_date).toISOString().slice(0, 16),
        opened: task.opened,
        task_state: task.task_state,
        labels: task.labels.map((l) => l.id),
        assignee: task.assignee ? task.assignee.id : 0,
      };
      this.milestoneID = task.milestones[0].id;
    });
  }

  loadUsers() {
    this.projectService.getUsersByProject(this.projectId).subscribe(
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
    this.projectService.getLabelsByProject(this.projectId).subscribe(
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

  loadMilestones() {
    this.milestoneService.getMilestonesByProjectId(this.projectId).subscribe(
      (response: Milestone[]) => {
        if (response !== null) {
          this.milestones = response;
          console.log(response);
        }
      },
      (error) => {
        alert('ERROR' + error);
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
    this.editTask.task_state = 'open';
  }

  markInProgress() {
    this.editTask.task_state = 'in progress';
  }

  markInReview() {
    this.editTask.task_state = 'in review';
  }

  markDone() {
    this.editTask.task_state = 'done';
  }

  handleLabelClick(id: number) {
    if (this.editTask.labels.find((n) => n === id)) {
      this.editTask.labels = this.editTask.labels.filter((n) => n !== id);
    } else {
      this.editTask.labels.push(id);
    }
  }

  handleMilestoneClick(id: number) {
    if (this.milestoneID === id) {
      this.milestoneID = 0;
    } else {
      this.milestoneID = id;
    }
  }

  isLabelAdded(id: number): boolean {
    return !!this.editTask.labels.find((n) => n === id);
  }

  isMilestoneSelected(id: number): boolean {
    return this.milestoneID === id;
  }

  handleAssigneeClick(id: number) {
    if (this.editTask.assignee === id) {
      this.editTask.assignee = 0;
    } else {
      this.editTask.assignee = id;
    }
  }

  isAssigneeSelected(id: number): boolean {
    return this.editTask.assignee === id;
  }

  editIssue() {
    if (this.editTask.title.length && this.editTask.due_date) {
      this.editTask = {
        ...this.editTask,
        milestones: this.milestoneID > 0 ? [this.milestoneID] : [],
      };
      this.taskService.editTask(this.editTask, this.id).subscribe(
        (response) => {
          if (response !== null) {
            alert('Issue Successfuly edited!');
            this.router.navigate([
              'dashboard/home/' +
                this.projectId +
                '/' +
                this.projectId +
                '/issues',
            ]);
          }
        },
        (error) => {
          alert('ERROR' + error);
        }
      );
    } else {
      alert('Please fill the form properly before editing issue');
    }
  }
}
