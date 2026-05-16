import { API_URL } from '../data/mockData';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

export const api = {
  register: async (data) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST', headers: headers(), body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST', headers: headers(), body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, { headers: headers() });
    return res.json();
  },

  // Admin
  getStudents: async (status) => {
    const url = status ? `${API_URL}/admin/students?status=${status}` : `${API_URL}/admin/students`;
    const res = await fetch(url, { headers: headers() });
    return res.json();
  },

  getStats: async () => {
    const res = await fetch(`${API_URL}/admin/stats`, { headers: headers() });
    return res.json();
  },

  verifyStudent: async (id) => {
    const res = await fetch(`${API_URL}/admin/students/${id}/verify`, {
      method: 'PATCH', headers: headers(),
    });
    return res.json();
  },

  rejectStudent: async (id) => {
    const res = await fetch(`${API_URL}/admin/students/${id}/reject`, {
      method: 'PATCH', headers: headers(),
    });
    return res.json();
  },
};
