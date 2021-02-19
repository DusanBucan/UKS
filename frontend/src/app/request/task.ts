export interface TaskRequest {
  title: string;
  description: string;
  due_date: string;
  project: number;
  assignee: number;
  author: number;
  labels: number[];
  opened: boolean;
  task_state: string;
  milestones: number[];
}
