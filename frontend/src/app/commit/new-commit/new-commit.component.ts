import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommitRequest } from 'src/app/request/commit';
import { CommitService } from 'src/app/services/commit.service';

@Component({
  selector: 'app-new-commit',
  templateUrl: './new-commit.component.html',
  styleUrls: ['./new-commit.component.css']
})
export class NewCommitComponent implements OnInit {

  public id: string;
  public commit: CommitRequest = {date: '', hash: '', summary: '', description: '', project: 0, user: 0 };
  constructor(private commitService: CommitService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.projectId;
  }

  create() {
    this.commit.project = Number(this.id);
    this.commitService.create(this.commit).subscribe(
      () => {
        this.router.navigate(['dashboard/home/' + this.id + '/' + this.id + '/commits']);
      }
    );
  }
}
