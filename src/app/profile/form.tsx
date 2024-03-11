// // form.tsx
// import { useState } from 'react';
// import { prisma } from '@/lib/db/prisma';
// import { useSession } from 'next-auth/react';

// export default function ProfileForm() {
//   const { data: session } = useSession();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await prisma.user.update({
//         where: {
//           id: session.user.id,
//         },
//         data: formData,
//       });
//       // Handle success
//       console.log('Profile updated successfully');
//     } catch (error) {
//       // Handle error
//       console.error('Error updating profile:', error);
//     }
//   };

//   // Check if session is available before rendering
//   if (!session) return null;

//   return (
//     <form onSubmit={handleSubmit} className="mt-4">
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//           Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//       <div className="mt-4">
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//       <div className="mt-4">
//         <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//           Phone
//         </label>
//         <input
//           type="text"
//           id="phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>
//       <div className="mt-4">
//         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Update
//         </button>
//       </div>
//     </form>
//   );
// }

export default function ProfileForm() {
  return (
    <div>
      <h1>ProfileForm</h1>
    </div>
  );
}