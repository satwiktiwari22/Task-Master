export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: Date | null;
  createdAt: Date;
  // New fields
  estimatedTime: number; // in minutes
  actualTime: number; // in minutes
  tags: string[];
  subtasks: SubTask[];
  recurring: RecurringPattern | null;
  attachments: Attachment[];
  collaborators: string[];
  notes: Note[];
  energy: 'low' | 'medium' | 'high'; // Energy level required
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'any';
  location: string;
  progress: number; // 0-100
}

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  endDate?: Date;
}

// New Analytics Interface
interface TodoAnalytics {
  completionRate: number;
  averageCompletionTime: number;
  productiveTimeOfDay: string;
  mostProductiveCategory: string;
  streakDays: number;
  overdueTasks: number;
}

export type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
};