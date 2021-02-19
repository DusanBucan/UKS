import { Component, OnInit } from '@angular/core';
import { GithubUser } from '../model/github_user';
import { Label } from '../model/label';
import { Project } from '../model/project';
import { Team } from '../model/team';
import { GithubUserService } from '../services/github-user.service';
import { LabelService } from '../services/label.service';
import { ProjectService } from '../services/project.service';

import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public project: Project = { name: '', labels: [], users: []};

  private labels: Label[] = [];
  private added_users : GithubUser[]=[];
  private added_teams : Team[]=[];

  public first_name="";
  public last_name="";
  public team_name="";

  public github_user : GithubUser;
  private teams: Team[] = [];
  
  constructor(private labelsService: LabelService, private projectService: ProjectService, private githubUserService : GithubUserService, private teamService : TeamService, private router:Router) { }

  ngOnInit() {
    this.loadLabels();
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe(
      (response) => {
        if (response !== null) {
          this.teams = response;
        }
      },
      (error) => {

      }
    );
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

   
    this.projectService.createProject(this.project, this.added_users, this.added_teams).subscribe(
      (response: any) => {
       
        alert('project successfuly added')


        if (this.added_teams.length!=0){

  
          for (let team of this.added_teams){
            this.teamService.addProjectToTeam(this.project.name, team.id).subscribe(
              (response: any) => {
                this.router.navigate(["/dashboard/profile"])
               
        
        
              },
              (error) => {
                this.router.navigate(["/dashboard/profile"])
              }
            );
          }
        }
        
        

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

      },
      (error) => {
        alert('User does not exist');
      }
    );
  }

  addTeam(team){
    this.added_teams.push(team);
    this.teams = this.teams.filter(item => item !== team)
    
  }

  remove(github_user){
    this.added_users = this.added_users.filter(item => item !== github_user)

  }

  removeTeam(team){
    this.added_teams = this.added_teams.filter(item => item !== team)
    this.teams.push(team);

  }
}
