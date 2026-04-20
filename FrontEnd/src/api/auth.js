const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper to simulate network delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(phone) {
  await delay();
  return {
    token: 'fake-jwt-token-abcd',
    user: {
      name: 'TestUser',
      role: 'customer',
      phone
    }
  };
}

export async function signup(name, phone, otp, role) {
  await delay();
  return {
    token: 'fake-jwt-token-xyz',
    user: {
      name,
      role,
      phone
    }
  };
}
