import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-issues",
  templateUrl: "./issues.component.html",
  styleUrls: ["./issues.component.css"],
})
export class IssuesComponent implements OnInit {
  private dropdownType = {
    unselected: "UNSELECTED",
    filter: "FILTER",
    author: "AUTHOR",
    label: "LABEL",
    project: "PROJECT",
    milestone: "MILESTONE",
    assignee: "ASSIGNEE",
    sort: "SORT",
  };
  private dropdownSelected: string = "";
  constructor() {}

  ngOnInit() {}

  selectDropdown(select: string) {
    this.dropdownSelected = select;
    console.log(this.dropdownSelected);
  }
}
