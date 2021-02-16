import { Project } from './project';
import { Label } from './label';

export interface Task {
    title: string;
    description: string;
    due_date: string;
    task_states_choice: string;
    task_state: string;
    project: Project;
    labels: Array<Label>;
    opened: boolean;
}