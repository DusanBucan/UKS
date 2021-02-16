import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';
import { Login } from '../model/login';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  public user: Login = { username: '',password:'' };
  constructor(private router: Router,private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  register() {
    this.router.navigate(["/registration"]);
  }

  login(){
    this.authenticationService.login(this.user).subscribe(
      (response) => {
      if (response !== null) {
        localStorage.setItem('currentUser', JSON.stringify({
          token: response['access']
          
        }));
        this.router.navigate(["/dashboard/home/issues"]);
        }
      }
    ,
    (error) => {
      alert("ERROR");
    }
  );
  }


}
