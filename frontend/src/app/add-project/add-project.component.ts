import { Component, OnInit } from '@angular/core';
import { GithubUser } from '../model/github_user';
import { Label } from '../model/label';
import { Project } from '../model/project';
import { GithubUserService } from '../services/github-user.service';
import { LabelService } from '../services/label.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public project: Project = { name: '', labels: [], users: []};

  private labels: Label[] = [];
  private added_users : GithubUser[]=[];

  public first_name="";
  public last_name="";

  public github_user : GithubUser;
  
  constructor(private labelsService: LabelService, private projectService: ProjectService, private githubUserService : GithubUserService) { }

  ngOnInit() {
    this.loadLabels();
  }

  loadLabels() {
    this.labelsService.getLabels().subscribe(
      (response: Label[]) => {
        if (response !== null) {
          this.labels = response;
        }
      },
      (error) => {
        alert('ERROR' + error);
      }
    );
  }

  handleLabelClick(id: number) {
    if (this.project.labels.find((n) => n === id)) {
      this.project.labels = this.project.labels.filter((n) => n !== id);
    } else {
      this.project.labels.push(id);
    }
  }

  isLabelAdded(id: number): boolean {
    return !!this.project.labels.find((n) => n === id);
  }

  create(){
    this.projectService.createProject(this.project).subscribe(
      (response: any) => {
        for (let github_user of this.added_users){
          this.project.users.push(github_user.id);
        }
        alert('project successfuly added')
  
      },
      (error) => {
        alert('ERROR' + error);
      }
    );
  
  }

  search(){
  
    this.githubUserService.searchUser(this.first_name, this.last_name).subscribe(
      (response: any) => {
        this.github_user=response;
        alert('User successfully added');
        //this.project.users.push(this.github_user.id);
        this.added_users.push(this.github_user);
        this.first_name="";
        this.last_name="";

        alert(this.project.users.length);
      },
      (error) => {
        alert('User does not exist');
      }
    );
  }
  remove(github_user){
    this.added_users = this.added_users.filter(item => item !== github_user)

  }
}
