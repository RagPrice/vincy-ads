interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}

interface SignupFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const USERS_KEY = 'vincy_ads_users';
const CURRENT_USER_KEY = 'vincy_ads_current_user';

// Helper functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

const setCurrentUser = (user: User) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

// Auth functions
export const signup = async (formData: SignupFormData): Promise<AuthResponse> => {
  try {
    const users = getUsers();
    const existingUser = users.find(u => u.email === formData.email);
    
    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser: User = {
      id: generateId(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone
    };

    saveUser(newUser);
    setCurrentUser(newUser);

    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, error: 'Failed to create account' };
  }
};

export const login = async (email: string, _password: string): Promise<AuthResponse> => {
  try {
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    // In a real app, we would verify the password hash here
    setCurrentUser(user);
    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Failed to log in' };
  }
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const checkAuth = (): User | null => {
  return getCurrentUser();
};

// Social login handlers
export const signupWithGoogle = async (): Promise<AuthResponse> => {
  try {
    // Simulate Google OAuth flow
    const mockGoogleUser: User = {
      id: generateId(),
      email: `google_${Date.now()}@gmail.com`,
      firstName: 'Google',
      lastName: 'User',
      phone: ''
    };
    
    saveUser(mockGoogleUser);
    setCurrentUser(mockGoogleUser);
    return { success: true, user: mockGoogleUser };
  } catch (error) {
    return { success: false, error: 'Google signup failed' };
  }
};

export const signupWithFacebook = async (): Promise<AuthResponse> => {
  try {
    // Simulate Facebook OAuth flow
    const mockFacebookUser: User = {
      id: generateId(),
      email: `facebook_${Date.now()}@facebook.com`,
      firstName: 'Facebook',
      lastName: 'User',
      phone: ''
    };
    
    saveUser(mockFacebookUser);
    setCurrentUser(mockFacebookUser);
    return { success: true, user: mockFacebookUser };
  } catch (error) {
    return { success: false, error: 'Facebook signup failed' };
  }
};

export const signupWithApple = async (): Promise<AuthResponse> => {
  try {
    // Simulate Apple OAuth flow
    const mockAppleUser: User = {
      id: generateId(),
      email: `apple_${Date.now()}@icloud.com`,
      firstName: 'Apple',
      lastName: 'User',
      phone: ''
    };
    
    saveUser(mockAppleUser);
    setCurrentUser(mockAppleUser);
    return { success: true, user: mockAppleUser };
  } catch (error) {
    return { success: false, error: 'Apple signup failed' };
  }
};
