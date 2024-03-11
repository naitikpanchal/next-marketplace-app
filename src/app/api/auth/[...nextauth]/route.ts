// import { prisma } from "@/lib/db/prisma";
// import { env } from "@/lib/env";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { NextAuthOptions } from "next-auth";
// import { Adapter } from "next-auth/adapters";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google";
// import bcryptjs from 'bcryptjs';

// // @ts-ignore
// export const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma) as Adapter,
//     secret: env.NEXT_AUTH_SECRET,
//     session: {
//       strategy: "jwt",
//     },
//     providers: [GoogleProvider({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET }),
//         CredentialsProvider({
//             name: 'Credentials',
//             id: 'credentials',
//             credentials: {
//               email: { label: "Email", type: "email", placeholder: "test@abc.com" },
//               password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials, req) {
//               console.log(credentials);
//               const email = credentials?.email;
//               const password = credentials?.password;

//               await prisma.$connect();
//               const user = await prisma.user.findUnique({
//                 where: {
//                     email: email,
//                 },
//               });
//               if (!user) {
//                 return null;
//               }
//               const isMatch = user && await bcryptjs.compareSync(password, user.password);
//               console.log(isMatch);
//               if (isMatch)
//               {
//                 console.log("existingUser: "+ JSON.stringify(user));
//                 return user;
//               }            
//               // Return null if user data could not be retrieved
//               return null
//             }
//           })],
// };
import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }