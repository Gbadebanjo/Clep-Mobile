import { create } from 'apisauce';
import Toast from 'react-native-toast-message';

const baseURL = 'https://sandbox.vazzel.com/api';

// Create the API instance
export const api = create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    api.setHeader('Authorization', `Bearer ${token}`);
  } else {
    api.deleteHeader('Authorization');
  }
};

// Request interceptor
api.addRequestTransform((request) => {
  // Add auth token if available
  if (authToken && !request.headers?.Authorization) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${authToken}`,
    };
  }
});

// Response interceptor for error handling
api.addResponseTransform((response) => {
  if (!response.ok) {
    const errorMessage = response.data?.message || 'Something went wrong';

    // Handle different error types
    switch (response.status) {
      case 401:
        Toast.show({
          type: 'error',
          text1: 'Authentication Error',
          text2: 'Please login again',
          text1Style: { fontSize: 14, fontWeight: 'bold' },
          text2Style: { fontSize: 12 },
        });
        // Clear token and redirect to login
        setAuthToken(null);
        break;
      case 403:
        Toast.show({
          type: 'error',
          text1: 'Access Denied',
          text2: errorMessage,
          text1Style: { fontSize: 14, fontWeight: 'bold' },
          text2Style: { fontSize: 12 },
        });
        break;
      case 404:
        Toast.show({
          type: 'error',
          text1: 'Not Found',
          text2: errorMessage,
          text1Style: { fontSize: 14, fontWeight: 'bold' },
          text2Style: { fontSize: 12 },
        });
        break;
      case 500:
        Toast.show({
          type: 'error',
          text1: 'Server Error',
          text2: 'Please try again later',
          text1Style: { fontSize: 14, fontWeight: 'bold' },
          text2Style: { fontSize: 12 },
        });
        break;
      default:
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
          text1Style: { fontSize: 14, fontWeight: 'bold' },
          text2Style: { fontSize: 12 },
        });
    }
  }
});

// Helper function for success messages
export const showSuccess = (message: string, title = 'Success') => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    text1Style: { fontSize: 14, fontWeight: 'bold' },
    text2Style: { fontSize: 12 },
  });
};

// Helper function for error messages
export const showError = (message: string, title = 'Error') => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    text1Style: { fontSize: 14, fontWeight: 'bold' },
    text2Style: { fontSize: 12 },
  });
};

// Helper function for info messages
export const showInfo = (message: string, title = 'Info') => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    text1Style: { fontSize: 14, fontWeight: 'bold' },
    text2Style: { fontSize: 12 },
  });
};
