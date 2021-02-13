import { Project } from './project';
import { Task } from './task';
import { Label } from './label';

export interface Milestone{
    title: string;
    description: string;
    start_date: string;
    due_date: string;
    projects: Array<Project>;
    tasks: Array<Task>;
    labels: Array<Label>;
}