const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProfile() {
  await delay();
  return {
    name: 'TestUser',
    role: 'customer',
    rating: 4.8,
    trustScore: 98,
    stats: {
      ordersPlaced: 12,
      ordersDelivered: 0,
      earnings: 0
    },
    recentActivity: [
      { id: 1, type: 'order', label: 'GEN. STORE - Completed' },
      { id: 2, type: 'order', label: 'CAFE - Completed' }
    ]
  };
}
