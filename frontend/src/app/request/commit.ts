export interface CommitRequest {
  date: string;
  hash: string;
  summary: string;
  description: string;
  project: number;
  user: number;
}
