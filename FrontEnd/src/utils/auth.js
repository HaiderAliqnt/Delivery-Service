export function getToken() {
  return localStorage.getItem('gikigo_token');
}

export function getRole() {
  return localStorage.getItem('gikigo_role');
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
