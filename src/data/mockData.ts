
import { University, User } from '../types/admin';

// Mock data for the admin page
export const universitiesData: University[] = [
  { id: 1, name: 'Московский государственный университет' },
  { id: 2, name: 'Санкт-Петербургский государственный университет' },
  { id: 3, name: 'МГТУ им. Н.Э. Баумана' },
  { id: 4, name: 'Новосибирский государственный университет' },
  { id: 5, name: 'Казанский федеральный университет' },
];

export const usersData: User[] = [
  { id: 1, name: 'Иванов А.А.', email: 'ivanov@example.com', role: 'reader' },
  { id: 2, name: 'Петров С.М.', email: 'petrov@example.com', role: 'manager' },
  { id: 3, name: 'Сидорова Е.В.', email: 'sidorova@example.com', role: 'reader' },
  { id: 4, name: 'Козлов И.Н.', email: 'kozlov@example.com', role: 'reader' },
  { id: 5, name: 'Морозова А.С.', email: 'morozova@example.com', role: 'manager' },
];
