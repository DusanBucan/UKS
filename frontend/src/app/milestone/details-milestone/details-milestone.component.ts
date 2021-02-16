import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Milestone } from 'src/app/model/milestone';
import { MilestoneService } from 'src/app/services/milestone.service';

@Component({
  selector: 'app-details-milestone',
  templateUrl: './details-milestone.component.html',
  styleUrls: ['./details-milestone.component.css']
})
export class DetailsMilestoneComponent implements OnInit {

  public milestone: Milestone = { title: '', description: '', due_date: '', start_date: '', project: 0 , tasks: []};
  public id: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private milestoneService: MilestoneService) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.id = id;
    this.milestoneService.get(id).subscribe(
      (data: Milestone) => {
        this.milestone = data;
      }
    );

  }

  openedNum() {
    let count = 0;
    for (const task of this.milestone.tasks) {
        if (task.opened) {
            count++;
        }
    }
    return count;
  }

  edit() {
    this.router.navigate(['/dashboard/home/milestone-new/' + this.id]);
  }
}