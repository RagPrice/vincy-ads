import { User, SignupFormData } from '../types';

const USERS_KEY = 'vincy_ads_users';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const createUser = (formData: SignupFormData): User | null => {
  const users = getUsers();
  
  // Check if email already exists
  if (users.some(user => user.email === formData.email)) {
    return null;
  }

  const newUser: User = {
    id: Date.now().toString(),
    ...formData,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const findUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
};
