import { SignupFormData } from '../types';

// Regular email signup
export const signupWithEmail = async (formData: SignupFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if email already exists in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = users.some((user: SignupFormData) => user.email === formData.email);
    
    if (emailExists) {
      return { success: false, error: 'Email already exists' };
    }

    // Add new user to localStorage
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set current user
    localStorage.setItem('currentUser', JSON.stringify(formData));
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create account' };
  }
};

// Social login handlers
export const signupWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simulate Google OAuth flow
    const mockGoogleUser = {
      name: 'Google User',
      email: `google_${Date.now()}@gmail.com`,
      provider: 'google'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockGoogleUser));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Google signup failed' };
  }
};

export const signupWithFacebook = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simulate Facebook OAuth flow
    const mockFacebookUser = {
      name: 'Facebook User',
      email: `facebook_${Date.now()}@facebook.com`,
      provider: 'facebook'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockFacebookUser));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Facebook signup failed' };
  }
};

export const signupWithApple = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simulate Apple OAuth flow
    const mockAppleUser = {
      name: 'Apple User',
      email: `apple_${Date.now()}@icloud.com`,
      provider: 'apple'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockAppleUser));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Apple signup failed' };
  }
};
