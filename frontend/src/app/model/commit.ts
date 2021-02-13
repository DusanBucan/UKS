import { Project } from './project';
import { GithubUser } from './github_user';

export interface Commit{
    date: string;
    project: Project;
    user: GithubUser;
}