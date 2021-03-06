import { User } from './user';

export interface GithubUser {
  id?: number;
  user: User;
  photo: string;
  github_profile_url: string;
  organization: string;
  member_since: string;
  skype: string;
  twitter: string;
  linkedin: string;
}
