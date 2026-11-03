export interface Topic {
  id: string;
  title: string;
  category: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  lastStudied: string;
  badgeColor: string;
}