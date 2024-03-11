"use client";
import { useState } from 'react';
import Link from "next/link";
import axios from 'axios';
import SubmitBtn from "@/components/SubmitBtn";
import { signIn } from "next-auth/react";
import { Toaster, toast } from 'sonner';
import { redirect } from 'next/navigation';

const RegistrationForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    try {
      const response = await axios.post('/api/register', {
        Name,
        email,
        password,
        phone
      });
      setCreatingUser(false);
      setUserCreated(true);
      console.log(response.data);
      if(response.status === 200 || response.status === 201) {
        console.log('Registration successful');
        toast.success(`User has been registered!`,
          {
            style: {
              backgroundColor: '#4CAF50',
              color: 'white',
              borderRadius: '5px',
              padding: '16px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              textAlign: 'center',
              maxWidth: '350px',
              margin: 'auto',
            },
          });
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
      }
    } catch (error) {
      console.error(error);
      setError(true);
      toast.error('Failed to Register the user!');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Registration Page</h1>
      {userCreated && 
        (<div>
          <p className="text-green-500 mb-4">User created successfully, you can 
            <Link href="/login" className='underline'> Login &raquo; </Link>
          </p>
        </div>)
        }
        {error && 
          (<div>
            <p className="text-red-500 mb-4">An error occurred, please try again</p>
            {redirect("/register")}
            {toast.error('Failed to Register the user!')}
          </div>)
        }
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-500"
            type="text"
            id="name"
            value={Name}
            disabled={creatingUser}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-500"
            type="email"
            id="email"
            value={email}
            disabled={creatingUser}
            required
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
            value={password}
            disabled={creatingUser}
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-teal-500"
            type="text"
            id="phone"
            value={phone}
            disabled={creatingUser}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <SubmitBtn
          className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600">
          Register
        </SubmitBtn>
        <Toaster position="bottom-right" expand={false}  richColors/>

        </form>

        <div className="my-4 text-center text-gray-500">
          or login with social account
        </div>
        <button className="flex gap-4 justify-center font-semibold bg-green-300 border border-gray-300 rounded-xl px-6 py-2 w-full text-gray-700" onClick={() => signIn("google", {
          callbackUrl: 'http://localhost:3000/'
        })}>Login with Google</button>

        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-2 py-4">Already have an account?</p>
          <button
            className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
            type="button" disabled={creatingUser} ><Link href="/login">
              Login
            </Link>
          </button>
        </div>
    </div>
  );
}

export default RegistrationForm;
