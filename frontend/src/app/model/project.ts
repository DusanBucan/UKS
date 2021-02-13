import { Label } from './label';
import { GithubUser } from './github_user';

export interface Project{
    name: string;
    labels: Array<Label>;
    users: Array<GithubUser>;
    deleted: boolean;
}