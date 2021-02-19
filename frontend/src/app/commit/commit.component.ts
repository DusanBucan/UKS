import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commit } from '../model/commit';
import { GithubUser } from '../model/github_user';
import { CommitService } from '../services/commit.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css'],
})
export class CommitComponent implements OnInit {
  public id: string;
  public commits: Commit[] = [];

  orders =  [{id: 1, name: 'Newest'}, {id: 2, name: 'Oldest'}];
  users: GithubUser[] = [];
  private dropdownType = {
    unselected: 'UNSELECTED',
    author: 'AUTHOR',
    sort: 'SORT',
  };

  private dropdownSelected = '';
  constructor(private router: Router,
              private projectService: ProjectService,
              private commitService: CommitService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.projectId;
    this.commitService.getCommitByProjectId(this.id).subscribe(
      (data: Commit[]) => {
        this.commits = data;
      }
    );
    this.projectService.getUsersByProject(this.id).subscribe(
      (data: GithubUser[]) => {
        this.users = data;
      }
    );
  }

  selectDropdown(select: string) {
    this.dropdownSelected = select;
  }

  new() {
    this.router.navigate(['dashboard/home/' + this.id + '/' + this.id + '/commit-new']);
  }

  details(id: string) {
    this.router.navigate(['dashboard/home/' + this.id + '/' + this.id + '/commit-details/' + id]);
  }

  filterAuthor(id: number): void {
   this.commitService.getCommitsByUserAndProject(id, this.id).subscribe(
     (data: Commit[]) => {
       this.commits = data;
       this.dropdownSelected = 'UNSELECTED';
     }
   );
  }
  filterOrder(order: number): void {
    this.commitService.getCommitsByOrderAndProject(order, this.id).subscribe(
      (data: Commit[]) => {
        this.commits = data;
        this.dropdownSelected = 'UNSELECTED';
      }
    );
  }

}
