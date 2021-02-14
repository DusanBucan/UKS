import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-commit",
  templateUrl: "./commit.component.html",
  styleUrls: ["./commit.component.css"],
})
export class CommitComponent implements OnInit {
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
