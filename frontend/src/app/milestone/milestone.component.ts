import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Milestone } from '../model/milestone';
import { MilestoneService } from '../services/milestone.service';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css'],
})
export class MilestoneComponent implements OnInit {
  id: string;
  milestones: Milestone[] = [];
  constructor(
    private router: Router,
    private milestoneService: MilestoneService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.projectId;
    this.getMilestones();
  }

  getMilestones() {
    this.milestoneService
    .getMilestonesByProjectId(this.id)
    .subscribe((data: Milestone[]) => {
      this.milestones = data;
    });
  }

  new() {
    this.router.navigate(['/dashboard/home/' + this.id + '/' + this.id + '/milestone-new']);
  }

  details(id: string) {
    this.router.navigate(['/dashboard/home/' + this.id + '/' + this.id + '/milestone-details/' + id]);
  }

  edit(id: string) {
    this.router.navigate(['/dashboard/home/' + this.id + '/' + this.id + '/milestone-new/' + id]);
  }

  delete(id: string) {
    this.milestoneService
    .delete(id)
    .subscribe(() => {
      this.getMilestones();
    });
  }
}
