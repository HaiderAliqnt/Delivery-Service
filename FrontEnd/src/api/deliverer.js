// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
import { FETCH_URL } from "../layout";
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function setAvailability(payload) {
  await delay();
  return { success: true, ...payload };
}

export async function getFeed(location) {
  const res = await fetch (
    `${FETCH_URL}/order/browse?location=${encodeURIComponent(location)}`
  );
  return res.json();
}

export async function claimOrder(orderId) {
  await delay();
  return { success: true, order_id: orderId };
}

export async function updateOrderStatus(orderId, status) {
  await delay();
  return { success: true, order_id: orderId, status };
}
