import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { LabelComponent } from './label/label.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { TaskComponent } from './task/task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamComponent } from './team/team.component';
import { CommitComponent } from './commit/commit.component';
import { GithubUserComponent } from './github-user/github-user.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { IssuesComponent } from './issues/issues.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { NewCommitComponent } from './commit/new-commit/new-commit.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { DetailsMilestoneComponent } from './milestone/details-milestone/details-milestone.component';
import { NewMilestoneComponent } from './milestone/new-milestone/new-milestone.component';
import { DetailsCommitComponent } from './commit/details-commit/details-commit.component';
import { WikiComponent } from './wiki/wiki.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

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
    IssueEditComponent,
    IssueCreateComponent,
    NewMilestoneComponent,
    DetailsMilestoneComponent,
    NewCommitComponent,
    DetailsCommitComponent,
    WikiComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, AngularEditorModule,ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
