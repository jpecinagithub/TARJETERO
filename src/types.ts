
export type ItemType = 'pdf' | 'image';

export interface DataItem {
  id: string;
  title: string;
  filename: string;
  type: ItemType;
  tags?: string[];
  description?: string;
}

export interface AppState {
  items: DataItem[];
  loading: boolean;
  error: string | null;
}
