export function getToken() {
  return localStorage.getItem('gikigo_token');
}

export function getRole() {
  return localStorage.getItem('gikigo_role');
}

export function setRole(new_role){
  localStorage.setItem('gikigo_role' , new_role)
}

export function setAuth(token, role) {
  localStorage.setItem('gikigo_token', token);
  localStorage.setItem('gikigo_role', role);
}

export function logout() {
  localStorage.removeItem('gikigo_token');
  localStorage.removeItem('gikigo_role');
}

export function isLoggedIn() {
  return !!getToken();
}

export function setStore(store){
  localStorage.setItem('store' , store)
}

export function getStore(){
  return localStorage.getItem('store')
}

export function setOutsideStore(Outstore){
  localStorage.setItem('outStore' , Outstore)
}

export function getOutsideStore(){
  localStorage.getItem('outStore')
}


export function storeOrderID(orderId){
  localStorage.setItem('orderId',orderId)
}

export function getOrderID(){
  return localStorage.getItem('orderId')
}

export function getTime(){
  return localStorage.getItem('Time')
}

export function setTime(time){
  localStorage.setItem('Time' , time)
}


export function getCustomerIdFromToken() {
  const token = getToken();
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payloadBase64 = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const payloadJson = decodeURIComponent(
      Array.from(atob(payloadBase64), (c) =>
        '%' + c.charCodeAt(0).toString(16).padStart(2, '0')
      ).join('')
    );
    const payload = JSON.parse(payloadJson);
    return payload.customer_id || payload.id || payload.sub || null;
  } catch {
    return null;
  }
}

export function getDelivererIdFromToken() {
  const token = getToken();
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payloadBase64 = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const payloadJson = decodeURIComponent(
      Array.from(atob(payloadBase64), (c) =>
        '%' + c.charCodeAt(0).toString(16).padStart(2, '0')
      ).join('')
    );
    const payload = JSON.parse(payloadJson);
    return payload.customer_id || payload.id || payload.sub || null;
  } catch {
    return null;
  }
}