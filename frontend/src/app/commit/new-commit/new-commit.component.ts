import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommitRequest } from 'src/app/request/commit';
import { CommitService } from 'src/app/services/commit.service';

@Component({
  selector: 'app-new-commit',
  templateUrl: './new-commit.component.html',
  styleUrls: ['./new-commit.component.css']
})
export class NewCommitComponent implements OnInit {

  public commit: CommitRequest = {date: '', hash: '', summary: '', description: '', project: 1, user: 1 };
  constructor(private commitService: CommitService,
              private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.commitService.create(this.commit).subscribe(
      () => {
        this.router.navigate(['dashboard/home/commits']);
      }
    );
  }
}
