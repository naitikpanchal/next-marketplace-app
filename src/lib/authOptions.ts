import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from 'bcryptjs';

// @ts-ignore
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    secret: env.NEXT_AUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    providers: [GoogleProvider({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
              email: { label: "Email", type: "email", placeholder: "test@abc.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const email = credentials?.email;
              const password = credentials?.password;
                
              await prisma.$connect();
              const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
              });
              if (!user) {
                return null;
              }
              if (password === undefined || password === null || password === "" || user.password === undefined || user.password === null || user.password === "")
              {
                return null;
              }
              const isMatch = user && bcryptjs.compareSync(password, user.password);
              if (isMatch)
              {
                return user;
              }
              return null
            }
          })],
};
