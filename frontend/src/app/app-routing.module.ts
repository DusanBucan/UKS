import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GithubUserComponent } from "./github-user/github-user.component";
import { HeaderComponent } from "./header/header.component";
import { IssuesComponent } from "./issues/issues.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { LabelComponent } from "./label/label.component";
import { CommitComponent } from "./commit/commit.component";
import { MilestoneComponent } from "./milestone/milestone.component";
import { ProjectComponent } from "./project/project.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "registration",
    component: RegistrationComponent,
  },
  {
    path: "dashboard",
    component: HeaderComponent,

    children: [
      {
        path: "profile",
        component: GithubUserComponent,
      },
      {
        path: "home",
        component: NavBarComponent,
        children: [
          { path: "issues", component: IssuesComponent },
          { path: "labels", component: LabelComponent },
          { path: "pull-requests", component: CommitComponent },
          { path: "milestones", component: MilestoneComponent },
          { path: "projects", component: ProjectComponent },
        ],
      },
    ],
  },
  { path: "**", redirectTo: "dashboard/home/issues" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
