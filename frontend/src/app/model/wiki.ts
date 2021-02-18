import { Project } from './project';

export interface Wiki {
    id?: number;
    project: Project;
    text: string;
  }