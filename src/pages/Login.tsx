import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginApi = async (email, password) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    if (email === 'user@ojtrag.com' && password === 'password123') {
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await loginApi(email, password);
    if (result.success) {
      alert('Login successful!');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-tr from-amber-300 via-amber-500 to-amber-100 overflow-hidden">
      {/* glowing background effects */}
      <div className="absolute top-[-80px] left-[-120px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,111,0,0.18)_0%,rgba(168,106,44,0.12)_80%,transparent_100%)] blur-md opacity-70" />
      <div className="absolute bottom-[-100px] right-[-140px] w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(168,106,44,0.18)_0%,rgba(255,111,0,0.10)_80%,transparent_100%)] blur-lg opacity-60" />

      <div className="absolute top-10 left-10 font-extrabold text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-white drop-shadow-md animate-slideIn">
        FPT UNIVERSITY
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/70 border-2 border-neutral-800 rounded-2xl shadow-xl p-10 w-[400px] flex flex-col backdrop-blur-md transition duration-300"
      >
        <div className="text-5xl font-extrabold text-orange-500 text-center mb-5 tracking-widest drop-shadow-md animate-pop">
          FPT
        </div>
        <h2 className="text-3xl font-bold text-amber-700 text-center mb-8 drop-shadow-sm animate-pop">
          OJT RAG Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="mb-4 px-4 py-3 border-2 border-amber-700 rounded-md text-lg bg-neutral-100 focus:outline-none focus:border-amber-600 focus:bg-amber-50 transition"
        />
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="mb-2 px-4 py-3 border-2 border-amber-700 rounded-md text-lg bg-neutral-100 focus:outline-none focus:border-amber-600 focus:bg-amber-50 transition"
        />
        <div className="text-amber-700 text-sm mb-4">Password must be at least 8 characters.</div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-2 py-3 rounded-md font-semibold text-lg border-2 transition-all ${
            loading
              ? 'bg-gray-400 border-gray-300 cursor-not-allowed'
              : 'bg-amber-700 text-white border-amber-800 hover:bg-amber-800 hover:shadow-lg'
          }`}
        >
          {loading ? (
            <span className="inline-block w-6 h-6 border-4 border-white border-t-amber-700 rounded-full animate-spin"></span>
          ) : (
            'Login'
          )}
        </button>

        {error && <div className="text-red-600 text-center mt-5">{error}</div>}
      </form>

      {/* Animations */}
      <style>
        {`
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-pop {
          animation: pop 1s cubic-bezier(.68,-0.55,.27,1.55);
        }

        @keyframes slideIn {
          0% { transform: translateX(-80px); opacity: 0; }
          60% { transform: translateX(10px); opacity: 1; }
          100% { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 1s cubic-bezier(.68,-0.55,.27,1.55);
        }
        `}
      </style>
    </div>
  );
}

export { default } from "./Login.jsx";
