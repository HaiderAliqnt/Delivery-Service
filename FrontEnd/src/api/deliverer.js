const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function setAvailability(payload) {
  await delay();
  return { success: true, ...payload };
}

export async function getFeed() {
  await delay();
  return [
    {
      order_id: 'ord-111',
      store: 'GEN. STORE',
      customer_name: 'Ahmad',
      preview: '2x Lays, 1x Cola...',
      status: 'OPEN'
    },
    {
      order_id: 'ord-222',
      store: 'CAFE',
      customer_name: 'Ali',
      preview: 'Zinger Burger',
      status: 'OPEN'
    }
  ];
}

export async function claimOrder(orderId) {
  await delay();
  return { success: true, order_id: orderId };
}

export async function updateOrderStatus(orderId, status) {
  await delay();
  return { success: true, order_id: orderId, status };
}
