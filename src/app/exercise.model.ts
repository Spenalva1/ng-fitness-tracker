export interface Exercise {
  id: string;
  name: string;
  duration: number;
  state?: 'completed' | 'cancelled' | null;
}
