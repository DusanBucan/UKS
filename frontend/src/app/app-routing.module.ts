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
import { InsightsComponent } from './insights/insights.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { TeamComponent } from './team/team.component';

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
    path: 'add-project',
    component: AddProjectComponent,
  },
  {
    path: 'add-team',
    component: TeamComponent,
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
        path: 'home/:prId',
        component: NavBarComponent,
        children: [
          { path: ':projectId/issues', component: IssuesComponent },
          { path: ':projectId/issue-create', component: IssueCreateComponent },
          { path: ':projectId/issue-edit/:id', component: IssueEditComponent },
          { path: ':projectId/labels', component: LabelComponent },
          { path: ':projectId/commits', component: CommitComponent },
          { path: ':projectId/commit-details/:id', component: DetailsCommitComponent },
          { path: ':projectId/commit-new', component: NewCommitComponent },
          { path: ':projectId/milestones', component: MilestoneComponent },
          { path: ':projectId/milestone-details/:id', component: DetailsMilestoneComponent },
          { path: ':projectId/milestone-new/:id', pathMatch: 'full', component: NewMilestoneComponent },
          { path: ':projectId/milestone-new', component: NewMilestoneComponent },
          { path: ':projectId/project', component: ProjectComponent },
          { path: ':projectId/wiki', component: WikiComponent },
          { path: ':projectId/insights', component: InsightsComponent },
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
