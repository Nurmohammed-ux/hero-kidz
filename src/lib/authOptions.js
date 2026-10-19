import { loginUser } from "@/action/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        return user || null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        // 🛠️ FIX: Check if user exists by email regardless of provider
        const existingUser = await dbConnect(collections.USERS).findOne({
          email: user.email,
        });

        if (!existingUser) {
          const newUser = {
            provider: "google",
            email: user.email,
            name: user.name,
            image: user.image,
            role: "user",
          };
          await dbConnect(collections.USERS).insertOne(newUser);
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.role = user.role || "user";
      } else if (token.email && !token.role) {
        // Fallback to fetch role from DB if token lacks it
        const dbUser = await dbConnect(collections.USERS).findOne({
          email: token.email,
        });
        token.role = dbUser?.role || "user";
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};