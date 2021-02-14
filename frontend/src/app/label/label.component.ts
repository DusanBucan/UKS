import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-label",
  templateUrl: "./label.component.html",
  styleUrls: ["./label.component.css"],
})
export class LabelComponent implements OnInit {
  private newLabelForm: boolean = false;

  constructor() {}

  ngOnInit() {}

  showNewLabelForm() {
    this.newLabelForm = true;
  }

  closeNewLabelForm() {
    this.newLabelForm = false;
  }
}
