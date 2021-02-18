import { Component, OnInit } from '@angular/core';
import { GithubUser } from '../model/github_user';
import { Team } from '../model/team';
import { Project } from '../model/project';
import { GithubUserService } from '../services/github-user.service';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-github-user',
  templateUrl: './github-user.component.html',
  styleUrls: ['./github-user.component.css']
})
export class GithubUserComponent implements OnInit {

  private loggedUser: GithubUser;
  private teams: Team[] = [];
  private projects: Project[] = [];


  constructor(private router: Router,
              private githubUserService: GithubUserService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.getLoggedIn();
    this.getProjects();
    // this.getTeams();
  }

  getLoggedIn() {
    this.githubUserService.getLoggedIn().subscribe(
      (response) => {
        if (response !== null) {
          this.loggedUser = response;
        }
      },
      (error) => {
        alert('ERROR');
      }
    );
  }

  getProjects() {
    this.projectService.getProjectsByUser().subscribe(
      (data: Project[]) => {
        this.projects = data;
      },
      () => {
        alert('ERROR');
      }
    );
  }

  getTeams() {
    this.githubUserService.getUsersTeams().subscribe(
      (response) => {
        if (response !== null) {
          this.teams = response;
        }
      },
      (error) => {
        alert('ERROR');
      }
    );
  }

  details(id: string) {
    this.router.navigate(['/dashboard/home/' + id + '/' + id + '/issues']);
  }
}
