export const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : '');
export const authHeaders = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' });
