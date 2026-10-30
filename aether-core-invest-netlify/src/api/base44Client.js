// Standalone replacement for the Base44 SDK: data is kept in localStorage.
const store = (name) => {
  const key = `local_${name}`;
  const read = () => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
  const write = (v) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return {
    list: async () => read(),
    filter: async (q = {}) => read().filter(r => Object.entries(q).every(([k, v]) => r[k] === v)),
    get: async (id) => read().find(r => r.id === id),
    create: async (data) => { const rec = { id: crypto.randomUUID(), created_date: new Date().toISOString(), ...data }; write([...read(), rec]); return rec; },
    update: async (id, data) => { const all = read().map(r => r.id === id ? { ...r, ...data } : r); write(all); return all.find(r => r.id === id); },
    delete: async (id) => { write(read().filter(r => r.id !== id)); },
  };
};
const demoUser = { id: 'demo', full_name: 'Demo User', email: 'demo@example.com', role: 'admin' };
export const base44 = {
  entities: new Proxy({}, { get: (_, name) => store(String(name)) }),
  auth: { me: async () => demoUser, logout: () => {}, redirectToLogin: () => {}, isAuthenticated: async () => true },
};
