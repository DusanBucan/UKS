import { Project } from './project';
import { GithubUser } from './github_user';

export interface Commit {
    date: string;
    hash: string;
    summary: string;
    description: string;
    project: Project;
    user: GithubUser;
}
