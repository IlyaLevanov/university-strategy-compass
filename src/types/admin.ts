
// Admin page types
export type FileType = 'A' | 'B' | 'C';

export interface University {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'reader' | 'manager';
}
