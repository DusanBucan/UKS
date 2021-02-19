import { GithubUser } from './github_user';
import { Project } from './project';

export interface Team{
    id: number;
    name: string;
    git_users: Array<any>;
    projects: Array<any>;
    deleted: boolean;
}