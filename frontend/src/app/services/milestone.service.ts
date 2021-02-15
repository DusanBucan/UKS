import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MilestoneService {
  milestoneUrl: string;
  constructor(private http: HttpClient) {
    this.milestoneUrl = environment.url + "api/milestones/";
  }

  getMilestonesByProjectId(id: string) {
    return this.http.get(this.milestoneUrl + "project/" + id + "/", {
      headers: new HttpHeaders()
        .append("Content-Type", "application/json")
        .append("Accept", "application/json"),
    });
  }
}
