import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubUser } from '../model/github_user';
import { Team } from '../model/team';
import { GithubUserService } from '../services/github-user.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public team: Team = { id: 5, name: '', git_users: [], projects: [], deleted: false};
  private added_users : GithubUser[]=[];

  public first_name="";
  public last_name="";
  public github_user : GithubUser;

  constructor(private teamService : TeamService, private githubUserService : GithubUserService, private router:Router) { }

  ngOnInit() {
  }

  add(){

    this.githubUserService.searchUser(this.first_name, this.last_name).subscribe(
      (response: any) => {
        this.github_user=response;
        this.added_users.push(this.github_user);
        this.first_name="";
        this.last_name="";

      },
      (error) => {
        alert('User does not exist');
      }
    );
  }

  remove(github_user){
    this.added_users = this.added_users.filter(item => item !== github_user)
    location.reload();

  }

  create(){
    this.teamService.createTeam(this.team).subscribe(
      (response: any) => {
        for (let github_user of this.added_users){
          this.team.git_users.push(github_user.id);
        }
        alert('team successfuly added')
        this.router.navigate(["/dashboard/profile"])
  
      },
      (error) => {
        alert('ERROR' + error);
      }
    );
  
  }
}
