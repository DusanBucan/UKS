import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubUserComponent } from './github-user/github-user.component';
import { HeaderComponent } from './header/header.component';
import { IssuesComponent } from './issues/issues.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LabelComponent } from './label/label.component';
import { CommitComponent } from './commit/commit.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { ProjectComponent } from './project/project.component';
import { NewMilestoneComponent } from './milestone/new-milestone/new-milestone.component';
import { DetailsMilestoneComponent } from './milestone/details-milestone/details-milestone.component';
import { UserAuthGuard } from './user-auth.guard';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { NewCommitComponent } from './commit/new-commit/new-commit.component';
import { DetailsCommitComponent } from './commit/details-commit/details-commit.component';
import { WikiComponent } from './wiki/wiki.component';
import { NgxEditorModule } from 'ngx-editor';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'dashboard',
    component: HeaderComponent,
    canActivate: [UserAuthGuard],

    children: [
      {
        path: 'profile',
        component: GithubUserComponent,
      },
      {
        path: 'home',
        component: NavBarComponent,
        children: [
          { path: 'issues', component: IssuesComponent },
          { path: 'issue-create', component: IssueCreateComponent },
          { path: 'issue-edit', component: IssueEditComponent },
          { path: 'labels', component: LabelComponent },
          { path: 'commits', component: CommitComponent },
          { path: 'commit-details/:id', component: DetailsCommitComponent },
          { path: 'commit-new', component: NewCommitComponent },
          { path: 'milestones', component: MilestoneComponent },
          { path: 'milestone-details/:id', component: DetailsMilestoneComponent },
          { path: 'milestone-new/:id', pathMatch: 'full', component: NewMilestoneComponent },
          { path: 'milestone-new', component: NewMilestoneComponent },
          { path: 'projects', component: ProjectComponent },
          { path: 'wiki', component: WikiComponent },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
