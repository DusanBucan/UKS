import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commit } from '../model/commit';
import { CommitService } from '../services/commit.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css'],
})
export class CommitComponent implements OnInit {
  public id: string;
  public commits: Commit[] = [];

  private dropdownType = {
    unselected: 'UNSELECTED',
    filter: 'FILTER',
    author: 'AUTHOR',
    label: 'LABEL',
    project: 'PROJECT',
    milestone: 'MILESTONE',
    assignee: 'ASSIGNEE',
    sort: 'SORT',
  };

  private dropdownSelected = '';
  constructor(private router: Router,
              private commitService: CommitService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.projectId;
    this.commitService.getCommitByProjectId(this.id).subscribe(
      (data: Commit[]) => {
        this.commits = data;
      }
    );
  }

  selectDropdown(select: string) {
    this.dropdownSelected = select;
    console.log(this.dropdownSelected);
  }

  new() {
    this.router.navigate(['dashboard/home/' + this.id + '/' + this.id + '/commit-new']);
  }

  details(id: string) {
    this.router.navigate(['dashboard/home/' + this.id + '/' + this.id + '/commit-details/' + id]);
  }
}
