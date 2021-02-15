import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Milestone } from "../model/milestone";
import { MilestoneService } from "../services/milestone.service";

@Component({
  selector: "app-milestone",
  templateUrl: "./milestone.component.html",
  styleUrls: ["./milestone.component.css"],
})
export class MilestoneComponent implements OnInit {
  milestones: Milestone[] = [];
  constructor(
    private router: Router,
    private milestoneService: MilestoneService
  ) {}

  ngOnInit() {
    this.milestoneService
      .getMilestonesByProjectId("1")
      .subscribe((data: Milestone[]) => {
        console.log(data);
        this.milestones = data;
      });
  }

  new() {
    this.router.navigate(["/dashboard/home/milestones-new"]);
  }

  edit() {}

  delete() {}
}
