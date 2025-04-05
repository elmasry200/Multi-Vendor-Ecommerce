import NextAuth from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Add the role property here
      id?: string;
      emailVerified?: boolean;
    };
  }
}
