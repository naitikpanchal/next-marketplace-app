"use client";
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { signIn } from 'next-auth/react';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoggingIn(true);
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
    setLoggingIn(false);
};
  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-500"
            type="email"
            id="email"
            name='email'
            value={email}
            disabled={loggingIn}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-500"
            type="password"
            id="password"
            name='password'
            value={password}
            disabled={loggingIn}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600 mb-4"
          type="submit"
          disabled={loggingIn}
        >
          Login
        </button>
      </form>

      <div className="my-4 text-center text-gray-500">
          or login with social account
        </div>
        <button className="flex gap-4 justify-center font-semibold bg-green-300 border border-gray-300 rounded-xl px-6 py-2 w-full text-gray-700" onClick={() => signIn("google", {
          callbackUrl: 'http://localhost:3000/'
        })}>Login with Google</button>

      <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-2">Don&apos;t have an account?</p>
          <button
            className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
            type="button"><Link href="/register">
              Register
            </Link>
          </button>
        </div>
    </div>
  );
};

export default LoginForm;
