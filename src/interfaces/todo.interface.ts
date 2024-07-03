export interface TodoI {
  id: string;
  createdAt: string;
  text: string;
  status: TodoStatus.Active | TodoStatus.Completed;
}

export enum TodoStatus {
  Active = "active",
  Completed = "completed",
}
