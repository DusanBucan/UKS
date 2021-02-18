import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commit } from 'src/app/model/commit';
import { CommitService } from 'src/app/services/commit.service';

@Component({
  selector: 'app-details-commit',
  templateUrl: './details-commit.component.html',
  styleUrls: ['./details-commit.component.css']
})
export class DetailsCommitComponent implements OnInit {

  public commit: Commit;
  constructor(private commitService: CommitService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.commitService.get(id).subscribe(
      (data: Commit) => {
        this.commit = data;
      }
    );
  }

}
