
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate credentials
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-24">
      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 italic underline decoration-gray-200">hito-koto Admin</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Management Portal</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Admin ID</label>
            <input type="text" required className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl" value={id} onChange={e => setId(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input type="password" required className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl" value={pw} onChange={e => setPw(e.target.value)} />
          </div>
          <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
