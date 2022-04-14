import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  jwt: {
    encryption: true
  },
  secret : process.env.NEXTAUTH_SECRET,
  
  // Configure a database adapter
  adapter: MongoDBAdapter(clientPromise),
  
  callbacks: {
    async session({ session, user }) {
      session.id = user.id;
      return session;
    },
  },
});

// Issuer.defaultHttpOptions = { timeout: 1000000, retries: 5, retryDelay: 1000 };
