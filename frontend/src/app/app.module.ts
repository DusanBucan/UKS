import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ProjectComponent } from "./project/project.component";
import { LabelComponent } from "./label/label.component";
import { MilestoneComponent } from "./milestone/milestone.component";
import { TaskComponent } from "./task/task.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TeamComponent } from "./team/team.component";
import { CommitComponent } from "./commit/commit.component";
import { GithubUserComponent } from "./github-user/github-user.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { IssuesComponent } from "./issues/issues.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    LabelComponent,
    MilestoneComponent,
    TaskComponent,
    DashboardComponent,
    TeamComponent,
    CommitComponent,
    GithubUserComponent,
    LoginComponent,
    RegistrationComponent,
    IssuesComponent,
    NavBarComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
