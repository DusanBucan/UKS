import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Milestone } from '../model/milestone';
import { MilestoneService } from '../services/milestone.service';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css'],
})
export class MilestoneComponent implements OnInit {
  milestones: Milestone[] = [];
  constructor(
    private router: Router,
    private milestoneService: MilestoneService
  ) {}

  ngOnInit() {
    this.getMilestones();
  }

  getMilestones() {
    this.milestoneService
    .getMilestonesByProjectId('1')
    .subscribe((data: Milestone[]) => {
      this.milestones = data;
    });
  }

  new() {
    this.router.navigate(['/dashboard/home/milestone-new']);
  }

  details(id: string) {
    this.router.navigate(['/dashboard/home/milestone-details/' + id]);
  }

  edit(id: string) {
    this.router.navigate(['/dashboard/home/milestone-new/' + id]);
  }

  delete(id: string) {
    this.milestoneService
    .delete(id)
    .subscribe(() => {
      this.getMilestones();
    });
  }
}
