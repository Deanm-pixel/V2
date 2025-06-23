import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      alert('Registrierung fehlgeschlagen');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Registrieren</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2" placeholder="Benutzername" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="w-full border p-2" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border p-2" type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2" type="submit">Registrieren</button>
      </form>
    </div>
  );
};

export default RegisterPage;
