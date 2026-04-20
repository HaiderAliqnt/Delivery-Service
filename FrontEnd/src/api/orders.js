const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createOrder(payload) {
  await delay();
  return {
    order_id: `ord-${Math.floor(Math.random() * 10000)}`,
    status: 'DRAFT',
    ...payload
  };
}

export async function submitOrder(payload) {
  await delay();
  return {
    order_id: payload.order_id || `ord-${Math.floor(Math.random() * 10000)}`,
    status: 'OPEN',
    ...payload
  };
}

export async function getStatus(orderId) {
  await delay();
  return {
    order_id: orderId,
    status: 'CLAIMED',
    deliverer: { name: 'Haider', avatar: null },
    store: 'GEN. STORE'
  };
}

export async function cancelOrder(orderId) {
  await delay();
  return { success: true, order_id: orderId };
}
