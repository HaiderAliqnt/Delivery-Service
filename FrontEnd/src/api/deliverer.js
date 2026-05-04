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

export async function claimOrder(orderId, deliverer_id) {
  const res = await fetch(`${FETCH_URL}/order/${orderId}/assign-deliverer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deliverer_id })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to claim order');
  }

  return data;
}

export async function updateOrderStatus(orderId, status) {
  
  const res = await fetch(`${FETCH_URL}/order/${orderId}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to claim order');
  }
  return data;
}

export async function getDelivererInfo(orderId) {
  const res = await fetch(`${FETCH_URL}/order/${orderId}/deliverer`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch deliverer info");
  }

  return data;
}