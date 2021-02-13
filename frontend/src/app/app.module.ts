import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServicesComponent } from './services/services.component';
import { ProjectComponent } from './project/project.component';
import { LabelComponent } from './label/label.component';
import { UserComponent } from './user/user.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { TaskComponent } from './task/task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamComponent } from './team/team.component';
import { CommitComponent } from './commit/commit.component';
import { GithubUserComponent } from './github-user/github-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    ProjectComponent,
    LabelComponent,
    UserComponent,
    MilestoneComponent,
    TaskComponent,
    DashboardComponent,
    TeamComponent,
    CommitComponent,
    GithubUserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
