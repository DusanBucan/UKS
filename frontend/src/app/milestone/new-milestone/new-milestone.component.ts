import { Component, OnInit } from '@angular/core';
import { Milestone } from 'src/app/model/milestone';
import { MilestoneService } from 'src/app/services/milestone.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-milestone',
  templateUrl: './new-milestone.component.html',
  styleUrls: ['./new-milestone.component.css'],
  providers: [DatePipe]
})
export class NewMilestoneComponent implements OnInit {

  public milestone: Milestone = { title: '', description: '', due_date: '', start_date: '', project: 1};
  public id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private milestoneService: MilestoneService,
              private datePipe: DatePipe) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id !== undefined) {
      this.id = id;
      this.milestoneService.get(id).subscribe(
        (data: Milestone) => {
          this.milestone = data;
        }
      );
    }
  }

  create() {
    this.milestone.start_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.milestoneService.create(this.milestone).subscribe(
      () => {
        this.router.navigate(['/dashboard/home/milestones']);
      },
      (error) => {
        console.log(error.error);
        alert('error');
      }
    );
  }

  edit() {
    this.milestoneService.edit(this.id, this.milestone).subscribe(
      () => {
        this.router.navigate(['/dashboard/home/milestones']);
      },
      (error) => {
        console.log(error.error);
        alert('error');
      }
    );
  }

  cancle() {
    this.router.navigate(['/dashboard/home/milestones']);
  }
}
