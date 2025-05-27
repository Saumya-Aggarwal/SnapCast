import { createAuthClient } from "better-auth/react";

// Get the correct base URL for the current environment
const getBaseURL = () => {
  // Server-side rendering
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  }
  
  // Client-side
  if (process.env.NODE_ENV === 'development') {
    return "http://localhost:3000";
  }
  
  // Use the current window location for production
  return window.location.origin;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});
