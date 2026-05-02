// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
import { FETCH_URL } from "../layout";


const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createOrder(payload) {
  const response = await fetch(`${FETCH_URL}/order/create`,{
    method:"POST",
    headers:{"Content-Type" : "application/json"},
    body: JSON.stringify(payload)
  })

  const result = await response.json()
  return result; 

}

export async function getStatus(orderId) {
  const response = await fetch(`${FETCH_URL}/order/${orderId}`,{
    method:"GET",
    headers:{"Content-Type" : "application/json"}
  })

  const result = await response.json()
  return result
}

export async function cancelOrder(orderId) {
  const response = await fetch(`${FETCH_URL}/order/cancel/${orderId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }

  });

  const result = await response.json();
  return result;
}

export async function updateOrderStatus(orderId, status) {
  const response = await fetch(`${FETCH_URL}/order/${orderId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  const result = await response.json();
  return result;
}



