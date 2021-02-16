import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { GithubUser } from '../model/github_user';
import { GithubUserService } from '../services/github-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user: User = { first_name:'',last_name:'',is_staff:true,is_active:true,is_superuser:true,email:'',username:'',password:'' };
  public githubUser: GithubUser = { user: this.user, photo:'',github_profile_url:'',organization:'',member_since:'',skype:'',twitter:'',linkedin:'' };
  constructor(private githubUserService: GithubUserService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    this.githubUserService.createUser(this.githubUser).subscribe((response) => {
      if (response !== null) {
        alert("Successful registration")
        this.router.navigate(["/login"]);
        }
      }
    ,
    (error) => {
      alert("ERROR");
    })

  }

}
