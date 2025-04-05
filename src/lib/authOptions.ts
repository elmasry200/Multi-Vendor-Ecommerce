import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import db from "./db";

import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    console.log("Authorize function recieved credentials:", credentials);
                    //Check if user credentials are they are not empty
                    if (!credentials?.email || !credentials?.password) {
                        throw { error: "No Inputs Found", status: 401 };
                    }
                    console.log("Passed Check 1");
                    // Check if user exists
                    const existingUser = await db.user.findUnique({
                        where: { email: credentials.email },
                    });
                    if (!existingUser) {
                        console.log("No User found");
                        throw { error: "No User found", status: 401 };
                    }

                    console.log("Passd Check 2");

                    // Ckeck if Password is correct
                    const passwordMatch = await compare(
                        credentials.password,
                        existingUser.password
                    );
                    if (!passwordMatch) {
                        console.log("Password incorrect");
                        throw { error: "Password incorrect", status: 401 };
                    }
                    console.log("Passd Check 3");
                    const user = {
                        id: existingUser.id,
                        name: existingUser.name,
                        email: existingUser.email,
                        role: existingUser.role,
                        emailVerified: existingUser.emailVerified
                    };
                    console.log("User Compiled");

                    return user;
                } catch (error) {
                    console.log("All Failed");
                    console.log(error);
                    throw { error: "Something went wrong", status: 401 };
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
          
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    emailVerified: token.emailVerified,
                },
            };
       
        },
        async jwt({ token, user }) {
            if (user) {
                const prismaUser = user as User; // Explicitly cast to Prisma User
                token.id = prismaUser.id;
                token.role = prismaUser.role;
                token.emailVerified = prismaUser.emailVerified;
            }
            return token;
        },
    }
}   

