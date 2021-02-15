import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-new-milestone",
  templateUrl: "./new-milestone.component.html",
  styleUrls: ["./new-milestone.component.css"],
})
export class NewMilestoneComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  create() {
    console.log("dodaj");
  }
}
