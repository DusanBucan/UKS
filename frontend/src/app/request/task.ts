export interface TaskRequest {
  title: string;
  description: string;
  due_date: string;
  project: number;
  assignee: number;
  labels: number[];
  opened: boolean;
  task_state: string;
}
